import { HistoryContainer, HistoryList, Status } from "./styles"

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="yellow">Em andamento</Status>
              </td>
            </tr>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>TArefa</td>
              <td>20 min</td>
              <td>há 2 meses</td>
              <td>
                <Status statusProperty="green">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
