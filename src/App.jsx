import React, { useCallback, useEffect, useState } from "react";

// todo usecallback is helpful when there is child prop,

// todo lets assume is ma increment wala b 1 function ha, us ki state change hony pe ye
// todo call ho ga, lakin useCallback se sirf dependency change hony pe call ho ga


// By memoizing the function, useCallback ensures that the function reference
// remains the same across re-renders unless its dependencies change.
// This is useful to avoid unnecessary re-creation of functions on each render.

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      characters += "0123456789";
    }

    if (characterAllowed) {
      characters += "!@#$%^&*()_+-=[]{}|;':\",.<>/?";
    }

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * characters.length)
      pass += characters.charAt(index)
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed]);

  // console.log("abdullah")
  return (

    <div className="bg-gray-800 h-[100vh] items-center pt-28 flex flex-col text-white">
      <h1> Password generator</h1>
      <div className="flex">
        <input
          className="h-8 text-black"
          value={password}
          placeholder="Your Desired Password is "
          type="text"
        />
        <button className="bg-blue-600 px-4 h-8">copy</button>
      </div>

      <div className="flex">
        <input
          type="range"
          min={6}
          max={25}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>

      <div className="flex gap-4">
        <input
          type="checkbox"
          defaultValue={numberAllowed}
          className="cursor-pointer"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label>Add Numbers</label>
      </div>

      <div className="flex gap-4">
        <input
          type="checkbox"
          defaultValue={characterAllowed}
          className="cursor-pointer"
          onChange={() => setCharacterAllowed((prev) => !prev)}
        />
        <label>Add Char</label>
      </div>
    </div>
  );
};

export default App;
