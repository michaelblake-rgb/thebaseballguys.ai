import { ReactFlow, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

function App() {
  return (
    <div className="h-screen w-screen">
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
