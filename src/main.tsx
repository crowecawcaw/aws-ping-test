import { StrictMode, useState } from 'react'
import { render } from 'react-dom'
import './index.css'

const regions = [
  'us-east-2',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-southeast-3',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-south-1',
  'eu-west-3',
  'eu-north-1',
  'me-south-1',
  'sa-east-1',
]
const TRIALS = 5
const initialState = Object.fromEntries(
  regions.map((region) => [region, [] as number[]])
)
const ping = async (region: string): Promise<number> => {
  const start = Date.now()
  await fetch(`https://dynamodb.${region}.amazonaws.com`)
  return Date.now() - start
}
const delay = (timeout: number) =>
  new Promise((res) => setTimeout(res, timeout))

const median = (list: number[]) =>
  list.sort((a, b) => a - b)[(list.length + 1) / 2]

function App() {
  const [state, setState] = useState(initialState)
  const [running, setRunning] = useState(false)

  const testRegion = async (region: string) => {
    for (let i = 0; i < TRIALS; i++) {
      const latency = await ping(region)
      setState((state) => ({
        ...state,
        [region]: state[region].concat(latency),
      }))
      await delay(250)
    }
  }

  const run = async () => {
    let index = 0
    const worker = async () => {
      while (index < regions.length) await testRegion(regions[index++])
    }
    await Promise.all([worker(), worker(), worker()])
  }

  return (
    <div className="App">
      <h1>AWS Regional Ping Test</h1>
      <div className="row">
        <div className="col info">
          <p>
            Find your ping to each AWS region. This test will ping the regional
            DynamoDB endpoint 5 times and display the median latency.
          </p>
          <p>
            <button
              disabled={running}
              onClick={async () => {
                setRunning(true)
                setState(initialState)
                await run()
                setRunning(false)
              }}
            >
              {running ? 'Running' : 'Test Now'}
            </button>
          </p>
        </div>
        <div className="col">
          <table>
            <thead>
              <th>Region</th>
              <th>Median Latency</th>
            </thead>
            <tbody>
              {Object.entries(state).map(([region, counts]) => (
                <tr>
                  <td>{region}</td>
                  <td className="latency">
                    {running && counts.length < TRIALS ? (
                      <ProgressBar value={counts.length / TRIALS} />
                    ) : counts.length === TRIALS ? (
                      `${median(counts)}ms`
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const ProgressBar = ({ value }: { value: number }) => (
  <div className="progress-bar">
    <div
      className="progress"
      style={{ width: `${value * 100}%`, height: '100%' }}
    />
  </div>
)

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
