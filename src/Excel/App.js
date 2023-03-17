import { Fragment, useState } from "react";
import { exportExcel, getTable, importExcel } from "../Api/api";
import styles from "./App.module.scss";

function App() {
  const [data, setData] = useState();
  const [savePath, setSavePath] = useState("");

  const handleImport = (event) => {
    if (event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      importExcel(formData);
    }
  };

  const handleExport = () => {
    exportExcel("Export", savePath);
  };

  const showTable = () => {
    getTable().then((results) => {
      setData(results.data);
    });
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.importButton}
        type="file"
        accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleImport}
      ></input>
      <button onClick={showTable}>Show Table</button>
      {data && (
        <Fragment>
          <table className={styles.table}>
            <tbody>
              <tr>
                {data.headers.map((items, index) => {
                  return <th key={index}>{items}</th>;
                })}
              </tr>
              {data.value.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items.id}</td>
                    <td>{items.name}</td>
                    <td>{items.pass}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={handleExport}>Export Excel</button>
          <input
            type="text"
            placeholder="Folder Path"
            onChange={(e) => {
              setSavePath(e.target.value);
            }}
          ></input>
        </Fragment>
      )}
    </div>
  );
}

export default App;
