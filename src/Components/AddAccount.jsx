import { useState } from "react";
import { create } from "../Functions/localStorage";

function AddAccount ({KEY, setLastRefresh}) {
    const [clientName, setClientName] = useState ('');
    const [clientSurname, setClientSurname] = useState ('');
    const inputClientName = (n) => {
        setClientName(n.target.value);
    }
    const inputClientSurname = (s) => {
        setClientSurname(s.target.value);
    }
    const addClient = () => {
        if (clientName.trim() !== '' && clientSurname.trim() !== ''){
            create(KEY, {clientName:clientName, clientSurname:clientSurname, funds: '0'});
            setClientName('');
            setClientSurname('');
            setLastRefresh(Date.now());
        } else {
            alert ("Klientas turi turėti vardą ir pavardę");
        }
    }

    return(<>
        <h2>Naujas banko klientas:</h2>
        <div className="new-client">
            <input className="input-name" type="text" placeholder="Vardas" value={clientName} onChange={inputClientName}/>
            <input className="input-surname" type="text" placeholder="Pavardė" value={clientSurname} onChange={inputClientSurname}/>
            <button className="btn btn-create" onClick={addClient}>Sukurti klienta</button>
        </div>
    </>
    )
}
export default AddAccount;