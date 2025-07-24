import { useCallback, useEffect, useRef, useState } from "react"
import { ClipboardDocumentCheckIcon, CheckIcon } from "@heroicons/react/16/solid"

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"
    
    for (let i = 1; i < length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  const handleCopy = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-600 h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-gray-800"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          {/* <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-800 text-white px-4 py-1 shrink-0 font-bold hover:bg-blue-600 active:bg-blue-800">Copy</button> */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 px-3 py-1 text-white font-bold transition-color shrink-0 outline-none duration-300 ${
              copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            {copied ? (
              <>
                <CheckIcon className="w-5 h-5 text-white" />
                Copied
              </>
            ) : (
              <>
                <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
                Copy-Pass
              </>
            )}
          </button>
        </div>

        <div className="flex text-sm gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className="cursor-pointer"
              onChange={() => setNumberAllowed((prev) => !prev)}
              name=""
              id=""
            />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
