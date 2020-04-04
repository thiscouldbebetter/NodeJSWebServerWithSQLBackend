Node.js WebServer with SQL Backend
==================================

The code in this repository implements a rudimentary web server in Node.JS with a SQL backend.

As of this writing, it only displays a list of the databases on a locally running MySQL server.


Installation on Linux
---------------------
1. In a file explorer, navigate to the Source directory of this repository.
2. Open a command prompt in the "Source" directory.
3. Run "sudo apt install nodejs".
4. Run "sudo apt install npm".
5. run "sudo npm install mysql".
5. Run "sudo apt install mysql-server".
6. Set up and start the MySQL server, making a note of the root user password.  See MySQL documentation for details.
7. Open 'Server.js' in a text editor, locate the placeholder password value "Password42", substitute in the actual MySQL password, and save.
8. Back in the command prompt, and in the "Source" directory, run the command "node Server.js".
9. In a web browser, navigate to the URL "http://localhost:1337".


