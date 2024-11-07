import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase("mundogeek.db")

export const createSessionsTable = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const insertSession = ({email, localId, token}) => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
        db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
    })
    return promise
}

export const fetchSession = () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = 'SELECT * FROM sessions'
        db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
    })
    return promise
}

//FUNCION PELIGROSA:
export const clearSessions= () => {
    const promise = new Promise((resolved,rejected)=>{
        const query = "DELETE FROM sessions" 
        db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
    })
    return promise
}