
const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext({});

export function AccountContextProvider({children}) {
  const ls = typeof window!=="undefined" ? window.localStorage : null;
  const [accountObj, setAccountObj] = useState({});
  const [accountSession, setAccountSession] = useState(false);
  const [accountFI, setAccountFI] = useState("AA");
  useEffect(() => {
    if(Object.keys(accountObj).length > 0 && accountObj !== undefined) {
      ls?.setItem("accountObj", JSON.stringify(accountObj));
      substrAccountFI(accountObj);
      setAccountSession(true);
    }

  }, [accountObj]);

 
  useEffect(() => {
    if(ls && ls.getItem("accountObj")) {
      setAccountObj(JSON.parse(ls.getItem("accountObj"))); 
    }
  }, [])

  function substrAccountFI(accountObj){
    setAccountFI(accountObj?.name?.substr(0,1) + accountObj?.surname?.substr(0,1));
  }

  function accountExit(){
    
    setAccountObj({});
    setAccountSession(false);
    setAccountFI("AA");
    ls?.setItem("accountObj", JSON.stringify({}));
   
  }

  
  return(
    <AccountContext.Provider value={{accountObj, setAccountObj, accountSession, setAccountSession, accountFI, accountExit}}>
      {children}
    </AccountContext.Provider>
  );

}