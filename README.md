# Designathon 2.0
---
Let's go :)

To check the race condition, paste the following script in browser

```js

const btn = document.querySelector('#book-btn');

// Set up the target time for today
const targetTime = new Date();

//change the time here

targetTime.setHours(3);
targetTime.setMinutes(42);
targetTime.setSeconds(0);  
targetTime.setMilliseconds(0); 

const triggerTime = targetTime.getTime();

if (Date.now() >= triggerTime) {
    console.error("Aborted: The target time has already passed! Update the setMinutes line.");
} else {
    console.log(`Armed. Will click exactly at ${targetTime.toLocaleTimeString()}...`);

    const timer = setInterval(() => {
        if (Date.now() >= triggerTime) {
            btn.click();
            console.log('BOOM! Clicked at:', Date.now());
            clearInterval(timer);
        }
    }, 1); 
}

```
