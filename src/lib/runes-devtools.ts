import type { Config } from "@redux-devtools/extension"

function connectToDevTools(name: string, options?: Config) {
  // override name
  options = { ...(options || {}), name }

  // connect to redux devtools
  if (typeof window === "undefined") {
    return undefined
  }
  console.log(options)
  return window.__REDUX_DEVTOOLS_EXTENSION__?.connect(options)
}

const devtoolsInstances = new Map<string, ReturnType<typeof connectToDevTools>>()

export function devtools(name: string | undefined = undefined, options?: Config) {
  const devtoolsInstance = devtoolsInstances.get(name || "") || connectToDevTools(name || "runes", options)
  if (!devtoolsInstance) {
    console.warn("Could not connect to redux devtools")
  }

  if (!devtoolsInstance) {
    if (name) {
      return (...args: any[]) => console.log(`%c${name}`, "color: #0f0", ...args)
    }
    return console.log
  }

  devtoolsInstances.set(name || "", devtoolsInstance)

  type InspectArgs = [ any, "init" | "update" ]

  return (...args: InspectArgs) => {
    const [ value, type ] = args
    console.log(value)
    if (type === "init") {
      devtoolsInstance?.init(value)
    } else {
      devtoolsInstance?.send({ type: "update" }, value)
    }
  }
}