import { useEffect, useState } from "react";
import { destroy, edit, read } from "../Functions/localStorage";

function BankApp({ KEY, setLastRefresh, lastRefresh }) {
  const [list, setList] = useState(null);
  const [fundChange, setFundChange] = useState(null);
  const [sortWhat, setSortWhat] = useState("surname");
  const fundsNow = (e, id) => {
    let validFunds = 0;
    if (e.target.value > 0) {
      validFunds = e.target.value;
    }
    setFundChange((l) => [
      ...l.filter((i) => i.id !== id),
      { funds: validFunds, id: id },
    ]);
  };
  const deleteClient = (id) => {
    if (list.filter((c) => c.id === id)[0].funds === "0") {
      destroy(KEY, id);
    } else {}
    setLastRefresh(Date.now());
  };
  const manipulateFunds = (id, sign) => {
    const fundsBefore = Number(list.filter((c) => c.id === id)[0].funds);
    const extraFunds = Number(fundChange.filter((i) => i.id === id)[0].funds);
    if (sign === "+") {
      edit(KEY, { funds: fundsBefore + extraFunds + "" }, id);
    } else if (sign === "-" && fundsBefore >= extraFunds) {
      edit(KEY, { funds: fundsBefore - extraFunds + "" }, id);
    } else {}
    setFundChange((l) => [
      ...l.filter((i) => i.id !== id),
      { funds: "0", id: id },
    ]);
    setLastRefresh(Date.now());
  };

  useEffect(() => {
    setList(read(KEY));
    const fundsWithID = [...read(KEY)];
    fundsWithID.forEach((c) => {
      delete c.clientName;
      delete c.clientSurname;
      c.funds = 0;
    });
    setFundChange(fundsWithID);
  }, [KEY, lastRefresh]);

  return (
    <div className="client-list-box">
      <ul className="client-list">
        <li className="list-labels">
          <div>
            <div onClick={() => setSortWhat("name")}></div>
            <div onClick={() => setSortWhat("surname")}></div>
            <div onClick={() => setSortWhat("funds")}></div>
          </div>
          <div></div>
          <div></div>
        </li>
        {list === null || fundChange === null ? (
          <dir>Loading clients, please wait.</dir>
        ) : (
          list
            .sort((a, b) =>
              sortWhat === "name"
                ? a.clientName.localeCompare(b.clientName)
                : sortWhat === "funds"
                ? a.funds - b.funds
                : a.clientSurname.localeCompare(b.clientSurname)
            )
            .map((c) => (
              <li className="client-item">
                <div className="client-info">
                  <div className="client-name">{c.clientName}</div>
                  <div className="client-surname">{c.clientSurname}</div>
                  <div style={{color: c.funds === '0'? 'red': 'inherit'}} className="client-funds">{c.funds}</div>
                </div>
                <div className="client-edit-funds">
                  <input
                    type="number"
                    min="0"
                    value={fundChange.filter((i) => i.id === c.id)[0].funds}
                    onChange={(e) => fundsNow(e, c.id)}
                  />
                  <button className="btn" onClick={() => manipulateFunds(c.id, "+")}>
                    Pridėti lėšų
                  </button>
                  <button className="btn" onClick={() => manipulateFunds(c.id, "-")}>
                    Nuskaičiuoti lėšas
                  </button>
                </div>
                <button
                  style={{
                    backgroundColor: c.funds === "0" ? "lightred" : "lightgray",
                  }}
                  className="btn btn-delete"
                  onClick={() => deleteClient(c.id)}
                >
                  Ištrinti
                </button>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}
export default BankApp;