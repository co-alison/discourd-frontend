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

  return (
    <div>
      <Select options={sortedNames} onChange={(option) => showPopup(option)} />
      {server && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <button onClick={closeModal}>&times;</button>
            <div className="header">Discord Invite Link</div>
            <div className="content">
              This will take you to the invite link for {server.name} (
              {server.url}). Are you sure?
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  window.open("https://www.google.com/", "_blank");
                }}
              >
                Ok
              </button>
              <button className="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </Popup>
      )}
      <Popup trigger={<button className="button">Add a server</button>} modal>
        {(close) => (
          <div className="modal">
            <button onClick={close}>&times;</button>
            <div className="header">Add a server</div>
            <div className="content">
              <span>
                You will receive an email once the server has been verified. Remember to submit a permanent invite link.
              </span>
              <form onSubmit={handleSubmit}>
                Sever Name:
                <input
                  type="text"
                  id="server-name"
                  onChange={(e) => setServerName(e.target.value)}
                  value={serverName}
                  required
                />
                <br />
                Invite Link:
                <input
                  type="text"
                  id="url"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Servers;
