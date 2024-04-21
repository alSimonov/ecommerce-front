
const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext({});

export function AccountContextProvider({children}) {
  const ls = typeof window!=="undefined" ? window.localStorage : null;
  const [accountObj, setAccountObj] = useState({});
  const [accountSession, setAccountSession] = useState(false);
  const [accountFI, setAccountFI] = useState("AA");
//   useEffect(() => {
//     if(accountObj.length > 0) {
//       ls?.setItem("cart", JSON.stringify(accountObj));
//     }
//   }, [accountObj]);
//   useEffect(() => {
//     if(ls && ls.getItem("cart")) {
//       setAccountObj(JSON.parse(ls.getItem("cart")));
//     }
//   }, [])

    function accountExit(){
        setAccountObj({});
        setAccountSession(false);
        setAccountFI("AA");
    }

  
  return(
    <AccountContext.Provider value={{accountObj, setAccountObj, accountSession, setAccountSession, accountFI, setAccountFI, accountExit}}>
      {children}
    </AccountContext.Provider>
  );

}