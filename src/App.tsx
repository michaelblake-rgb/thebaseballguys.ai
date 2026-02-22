import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react'
import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

function App() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="h-screen w-screen">
          <div className="absolute right-4 top-4 z-50">
            <UserButton />
          </div>
          <ReactFlow>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </SignedIn>
    </>
  )
}

export default App
