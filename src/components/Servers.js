import { useState, useEffect } from "react";
import serverService from "../services/server";
import Select from "react-select";
import Popup from "reactjs-popup";
import emailService from "../services/email";

const Servers = ({ user, setMessage, setError }) => {
  const [servers, setServers] = useState([]);
  const [server, setServer] = useState(null);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [serverName, setServerName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (user) {
      serverService.setToken(user.token);
      serverService.getAll().then((servers) => setServers(servers));
    }

    setOpen(false);
  }, []);

  const names = servers.map((server) => ({
    label: server.name,
    value: server.name,
  }));
  const sortedNames = names.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  const showPopup = (option) => {
    const serverName = option.value;
    const serverArray = servers.filter((server) => server.name === serverName);
    setServer(serverArray[0]);
    setOpen((o) => !o);
  };

  const handleSubmit = async (event) => {
      event.preventDefault()

      const addServerEmail = {
          to: 'ubcdiscourd@gmail.com',
          subject: `New Add Server Request`,
          text: `User Name: ${user.name}
                User Email: ${user.email}
                Server Name: ${serverName}
                Server URL: ${url}`
      }

      try {
          await emailService.sendEmail(addServerEmail)
          setServerName('')
          setUrl('')
          setMessage('Server request sent successfully')
          setError(false)
          setTimeout(() => {
              setMessage(null)
          }, 3000)
      } catch (error) {
          console.log(error)
          setMessage('Something went wrong. Try again or contact ubcdiscourd@gmail.com')
          setError(true)
          setTimeout(() => {
              setMessage(null)
          }, 5000)
      }
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black'
    }),
    control: (provided) => ({
      ...provided
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {...provided, opacity, transition}
    }
  }

  return (
    <div className="servers">
      <div className="servers-select">
        <Select options={sortedNames} styles={customStyles} onChange={(option) => showPopup(option)} />
      </div>
      {server && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <button onClick={closeModal} className="close" >&times;</button>
            <div className="header">Discord Invite Link</div>
            <div className="content">
              This will take you to the invite link for {server.name} (
              {server.url}). Are you sure?
            </div>
            <div className="actions">
              <button
                className="signup-btn"
                onClick={() => {
                  window.open("https://www.google.com/", "_blank");
                }}
              >
                Ok
              </button>
              <button className="signup-btn" style={{backgroundColor: "gray"}} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </Popup>
      )}
      <Popup trigger={<button className="signup-btn">Add a server</button>} modal>
        {(close) => (
          <div className="modal">
            <button onClick={close} className="close">&times;</button>
            <div className="header">Add a server</div>
            <div className="content">
              <span>
                You will receive an email once the server has been verified. Remember to submit a permanent invite link.
              </span>
              <form className="server-form" onSubmit={handleSubmit}>
                <div className="server-input-group">
                  <label>Sever Name:</label>
                  <input
                    type="text"
                    id="server-name"
                    onChange={(e) => setServerName(e.target.value)}
                    value={serverName}
                    required
                  />
                </div>
                <div className="server-input-group">
                  <label>Invite Link:</label>
                  <input
                    type="text"
                    id="url"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    required
                  />
                </div>
                <div className="server-input-group">
                  <button type="submit" className="signup-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Servers;
