import React from "react";
import "./App.css";

// Objects
class Client {
  constructor(session, version) {
    this.session = session;
    this.version = version;
  }
}

class Session {
  constructor(user, version) {
    this.user = user;
    this.version = version;
  }
}

class User {
  constructor(version) {
    this.version = version;
  }
}

// Contexts
const ClientContext = React.createContext();
const useClient = () => {
  return React.useContext(ClientContext);
};

const SessionContext = React.createContext();
const useSession = () => {
  return React.useContext(SessionContext);
};

const UserContext = React.createContext();
const useUser = () => {
  return React.useContext(UserContext);
};

const ContextWrapper = ({ children }) => {
  const [client, setClient] = React.useState(
    new Client(new Session(new User(1), 1), 1)
  );

  const newClient = () => {
    setClient(new Client(client.session, client.version + 1));
  };

  const newSession = () => {
    setClient(
      new Client(
        new Session(client.session.user, client.session.version + 1),
        client.version + 1
      )
    );
  };

  const newUser = () => {
    setClient(
      new Client(
        new Session(
          new User(client.session.user.version + 1),
          client.session.version + 1
        ),
        client.version + 1
      )
    );
  };

  return (
    <ClientContext.Provider value={client}>
      <SessionContext.Provider value={client.session}>
        <UserContext.Provider value={client.session.user}>
          <div>
            <button onClick={newClient}>New Client, Same Session & User</button>
          </div>
          <div>
            <button onClick={newSession}>
              New Client & Session, Same User
            </button>
          </div>
          <div>
            <button onClick={newUser}>New Client, Session, & User</button>
          </div>
          {children}
        </UserContext.Provider>
      </SessionContext.Provider>
    </ClientContext.Provider>
  );
};

// Display helpers
const ClientInfo = () => {
  const client = useClient();
  console.log("Render Client, Version", client.version);
  return <div>Client Version {client.version}</div>;
};
const SessionInfo = () => {
  const session = useSession();
  console.log("Render Session, Version", session.version);
  return <div>Session Version {session.version}</div>;
};
const UserInfo = () => {
  const user = useUser();
  console.log("Render User, Version", user.version);
  return <div>User Version {user.version}</div>;
};

function App() {
  return (
    <ContextWrapper>
      <ClientInfo />
      <SessionInfo />
      <UserInfo />
    </ContextWrapper>
  );
}

export default App;
