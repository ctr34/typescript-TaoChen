# How was I thinking
I allocated the time spent among these parts in turn: 
1. Understand it thoroughly that the task wants me to achieve, then list the requirements into my code workplace so that I can bear the target in mind .
2. Figure out with what are the input and expected outputs.
3. Go through the library code so that make sure I have a big picture how does the tax calculator work.
4. Implement my solution with basic needs first, since usability is supposed to be the higher priority. For example, can I get the expected number after hand in the input. Afterwards, I can move on to investigate where the bug is.
5. Go for checking robustness, add the condition checking and error handling before invoking getTax().
6. Test it with the provided test cases (about to spend some time to clarify what the list of dates are meaning for, it is needed to cover different date as one single input or not, ).
6. Try to remove the duplicated code if it does exist, and try to optimize code including decoupling the modules, thinking of the better interface hierarchy.
7. Of course to complete the bonus part if I have time.

# Supplement explanation of my code
1. The entrypoint is getTaxController.ts
2. As I have completed the bonus part, congestionTaxCalculator_Gbg.ts is assumed to a Api in the outside store which can be invoked by our app(e.g. getTaxController.ts) with Http request. The suffix Gbg means city Gothenburg, it can be something else, Stockholm for example. Here I just simply import the 'external' module congestionTaxCalculator_Gbg.ts rather than making a new Http request. The kind of modules is selected by runtime input.
3. The bug was found at the last 'return' of function getTax(), it's an obvious mistake, the variable 'totalFee' should be place on each branch that the program runs forward.
4. [classMap](./classMap.ts) is an alternative I was considering to select certain class base on runtime input.

# An example of request it 
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"city": "Gbg", "vehicle": "car", "timestamp": ["2014-02-07 06:23:27", "2013-02-07 15:27:00"]}' \
http://localhost:3001/getTax
```
