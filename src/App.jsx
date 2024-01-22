import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [count, setCount] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  let passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "$#%!^&*(){}[]";

    for (let i = 0; i <= count; i++) {
      let b = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(b);
    }

    setPassword(pass);
  }, [count, numberAllowed, charAllowed, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [count, charAllowed, numberAllowed, passwordGenerator]);
  return (
    <>
      <div className="bg-slate-700 w-full h-screen">
        <h1 className="text-white text-2xl py-4 font-semibold text-center">
          Password Generator Using React/Vite
        </h1>
        <div className="bg-slate-500 w-[40vw] h-48 flex flex-col justify-around mx-auto rounded-xl shadow-3xl py-3 px-2">
          <div className="bg-white flex justify-between rounded-xl">
            <input
              type="text"
              value={password}
              placeholder={password}
              className="outline-none px-4 py-2 w-full rounded-xl"
              readOnly
              ref={passwordRef}
            />
            <button
              className="rounded-r-lg px-4 py-2 bg-blue-500 hover:bg-blue-800"
              onClick={copyPassword}
            >
              copy
            </button>
          </div>
          <div className="my-4 flex items-center justify-around h-5 text-white text-lg">
            <div className="flex justify-center items-center">
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={count}
                className="mt-2"
                name="length"
                onChange={(e) => setCount(e.target.value)}
              />
              <label htmlFor="length" className="ml-2">
                Length : {count}{" "}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="number"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="number" className="inline-block cursor-pointer">
                Number
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="char"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="char" className="inline-block cursor-pointer">
                Char
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
