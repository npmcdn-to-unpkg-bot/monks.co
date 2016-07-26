---
published: true
title: Using Monads
tagline: Functional Usage
year: '2016'
website: 'https://tonicdev.com/amonks/578beb1fdb37ac12001d3826'
categories:
  - howto
  - javascript
---
You can try this code out in your browser on [tonicdev](https://tonicdev.com/amonks/578beb1fdb37ac12001d3826)

Have you ever chained a bunch of functions together?

Math.log(Math.floor(Math.sqrt(Math.random())))

Maybe in jQuery?

$('div').css('color', 'red')
    .slideUp(2000)
    .slideDown(2000)

or with promises or node streams?


It's a powerful, expressive, & concise way to program.


It's easy to do when you have a set of functions
that accept an object and return an object of 
the same type.

These four functions all work with jQuery DOM elements:

- $('div')
- .css('color', 'red')
- .slideUp(2000)
- .slideDown(2000)

These four functions all work with Numbers:

- Math.random
- Math.sqrt
- Math.floor
- Math.log


Check out this chain:

    const isEven = x => x % 2 == false
    
    [5].map(add(1))
       .map(multiply(4))
       .filter(isEven)
       .map(power(2))
       [0]

Here's a few properties that arrays have that make
them good for chaining:

- there's a way to put something into an array ([])
- there's a way to get something out of an array
([0]) 
    - in fact, `i === [i][0]` 
- there are functions that take arrays and return 
  other arrays, like `filter(fn)`
- there's `.map(fn)`, which does three things: 
  - unwrap the array 
  - apply a apply regular (not array-specific) 
    function to the value inside 
  - wrap the result back up into an array

When a data structure has those properties ^^, it is
a monad.

jQuery DOM elements are not a monad because there
isn't really a way to put something in and take it
back out.

The Array Monad has some special features that
distinguish it from other monads, namely:

- it's good for holding a bunch of values in a
  particular order 
- it's good for finding a value if you know 
  its index

Monads ("chainable containers") are such a generic
idea that people have conceived of monads suited to
all sorts of particular tasks, such as:

- the Maybe Monad and the Either Monad, which make it easy to chain functions together that might fail

- the Task/Future monad, which makes it easy to chain functions together that perform long-running or asynchronous tasks - the IO monad, which makes it easy to control exactly when and how a chain of functions interacts with the outside world

Functions within a program might all return
different monads. This program has a long-running
function that returns a Task monad, a
randomly-failing function that returns a Maybe
monad, and a logging function that returns an IO
monad.

However, functions in a chain must all accept and
return the same type of monad. The chain in this
program is based around the Task monad. We'll use
functions to convert the Maybe and IO monads into
Task monads.

Let's get started.

<!--more-->

```javascript
// ///////////////////////////////////////////////

/* Imports 
 *
 * None of these monads is especially complex,
 * a better article than this one could have you
 * implementing all of them without breaking a
 * sweat.
 *
 * For interoperability, most monad implementations
 * in javascript conform to the fantasy land spec.
 *
 * see: https://github.com/fantasyland/fantasy-land
 */

const Task = require('data.task')
const R = require('ramda')
const IO = require('fantasy-io')

const Maybe = require('data.maybe')
const Just = Maybe.Just
const Nothing = Maybe.Nothing

// ///////////////////////////////////////////////

/* Util */


//    depoint : a[String] -> c -> (a -> b) => String -> a -> b -> c
const depoint = R.curry((fnName, args, obj) => obj[fnName](...args))



// ///////////////////////////////////////////////

/* Functions 

 * Our chain is based on the Task Monad, but that
 * doesn't mean all our functions need to accept or
 * return Tasks.
 *
 * Each of our chained functions will do kinda the
 * same thing: build a string around its input.
 * 
 * But, they'll each return a different type of value.
 */


 /* Non-monadic
 
  * Here's a basic wrapper. Nothing monad-specific.
  *
  * If you aren't hip to es6, the arrow syntax might
  * be confusing.
  *
  * Here's wrap without the arrows:
  *
  *     const wrap = function (str) {
  *       return function (val) {
  *         return `${str} <NM> [${val}]`
  *       }
  *     }
  * 
  * Call it like this:
  * 
  *     const sayHello = wrap('hello!')
  *     sayHello(5)
  *     // "Hello! <NM> [5]"
  *
  *     wrap('Goodbye')('watermelon')
  *     // "Goodbye! <NM> [watermelon]"
  *
  *     wrap('Goodbye')(sayHello('Wonderful!'))
  *     // "Goodbye <NM> [Hello! <NM> [Wonderful!]]"
  */

//    wrap : String -> a -> String
const wrap = str => val => `${str} <NM> [${val}]`

    
/* Task 
 *
 * This function accomplishes the same thing,
 * except it does it asynchronously, after a
 * 100ms delay, and it returns a Task monad.
 *
 * A Task monad is a reference to a value that
 * might not be in yet, perhaps the result of
 * a long-running process or a network request.
 *
 * In this example, our chain is made up of
 * Task Monads.
 *
 * If you've worked with promises, it might
 * feel a bit familiar.
 *
 * Tasks in a chain won't execute until the
 * chain reaches a `.fork()`. Scroll down to our
 * chain and you'll see a fork at the end.
 *
 * If you chain a bunch of tasks together
 * and one fails, the chain will break and skip
 * to the next chained `.fork()`.
 * 
 * At the fork, you can handle the errors and
 * resume processing (or not).
 *
 * The Task monad also provides ways to do
 * things we won't here, like:
 *
 * - pause a chain until several concurrent
    tasks are complete
 * - sort tasks by how long they took
 */

//    wrapSlowly : String -> String -> Task(_, String)
const wrapSlowly = msg =>
  str =>
    new Task((reject, resolve) =>
      setTimeout(() => resolve(`${msg} [<TASK> ${str}]`), 100)
    )

/* IO 
 *
 * This function wraps the text too, but it
 * also logs its input and returns an IO monad.
 *
 * IO monads are like the delayed execution
 * (`.fork()`) part of Task Monads, minus the
 * error handling and the asynchronicity.
 *
 * You can use them to controlwhen and where
 * certain procedures (usually IO) are performed.
 * 
 * You can chain IO monads together, and they
 * won't be executed until the chain reaches a
 * `.unsafePerform()`.
 *
 * In some languages (like Haskell), functions
 * _can't_ have any side effects unless they're
 * wrapped in an IO Monad.
 *
 * It sounds niche, but there are cases (like
 * working with library code) when it's very
 * comforting to know that nothing will happen
 * until you explicitly tell it to.
 */

//    wrapAndLog : String -> a -> IO( String )
const wrapAndLog = msg => val => IO(() => { 
  console.log(`log: [msg ${msg}] [val ${val}]`)
  return `${msg} <IO> [${val}]`
})


/* Maybe 
 * 
 * This one's fun. Half the time it just returns
 * the wrapped string, like the other functions,
 * but there's a 50% chance it will return nothing.
 *
 * The Maybe monad is among the most useful. It
 * consists of two types: Just (think 'only', like
 * Just(5)) and Nothing.
 *
 * A function in a Maybe monad chain will only
 * execute if its passed a Just. If it's passed a
 * Nothing, it'll silently pass the Nothing right
 * along.
 *
 * See also:
 * The Either monad is similar, but more generic.
 * A function in an Either chain can return one of
 * two definable types. Usually the type it was passed
 * _or_ an Exception, which is more detailed
 * than Nothing.
 */

//    wrapMaybe : String -> a -> Maybe(String)
const wrapMaybe = msg => val =>
  Math.random() > 0.5 ? Just(`${msg} <JUST> [${val}]`)
                      : Nothing()


// ///////////////////////////////////////////////

/* Convert Other Monads to Tasks!

 * We're building our chain around the Task Monad,
 * so we'll need to be able to turn our other monads
 * into Task Monads.
 * 
 * Putting some value (like another monad) into a
 * monad container is called "lifting" it.
 */


//    IOToTask : (IO) -> a -> Task[_ a]
const IOToTask = io =>
  v => new Task((reject, resolve) =>
    R.compose(resolve, depoint('unsafePerform', [undefined]), io)(v)
  )

//    MaybeToTask : Maybe -> Task
const MaybeToTask = m => v => {
  const maybied = m(v)
  return maybied.isNothing ? Task.rejected('error')
                           : Task.of(maybied.value)
}

const wrapAndLog_task = R.compose(IOToTask, wrapAndLog)

const wrapMaybe_task = R.compose(MaybeToTask, wrapMaybe)


// ///////////////////////////////////////////////

/* Chain it!
    
 * We're good to go. This is a Task-based chain,
 * so we'll start by lifting (converting) a string
 * literal into a Task
 */

Task.of('1 <INIT>')
  .map(wrap('2'))
  .chain(wrapSlowly('3'))
  .chain(wrapAndLog_task('4'))
  .chain(wrapMaybe_task('5'))
  .chain(wrapAndLog_task('6'))
  .fork(
    val => console.log(`7a <FAILURE> [${val}]`),
    val => console.log(`7b <SUCCESS> [${val}]`)
  )


// ///////////////////////////////////////////////

/* Bonus: Pointfree style
  
 * With a couple extra utilities, we can
 * compose our chain into a function
 *
 * This style is called "pointfree" because
 * you don't have to refer to the "point"
 * of the function (aka the initial value)
 */
    
const map = fn => depoint('map', [fn])
const chain = fn => depoint('chain', [fn])
    
// compose works inside out, to match how
// functions would be nested:
//
// f(g(x)) === R.compose(f, g)(x)

const app = R.compose(
  depoint('fork', [
    val => console.log(`7a <FAILURE> [${val}]`),
    val => console.log(`7b <SUCCESS> [${val}]`)
  ]),
  chain(wrapAndLog_task('6')),
  chain(wrapMaybe_task('5')),
  chain(wrapAndLog_task('4')),
  chain(wrapSlowly('3')),
  map(wrap('2')),
  Task.of
)

app('1 <INIT>')

/* Cool, huh?
 *
 * So today we learned about _using_ monads, which
 * we imported from Folktale.js and from fantasy-land.
 *
 * We did not implement our own monadic containers
 */
```