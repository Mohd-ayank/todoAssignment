const application = {
  util: {
    listItem: function(image, title, callback) {
      let element = document.createElement("div");
      element.className = "list-item";
      element.innerHTML =
        '<img src="' +
        image +
        '"/><span>' +
        title +
        '</span><img class="active" src="http://bulgakoff.tk/arrow-right.svg"/>';
      element.onclick = callback;
      return element;
    }
  },
  loaders: {
    root: function() {
      let request = new XMLHttpRequest();
      let condition = { parent: "" };
      request.open(
        "GET",
        "https://bulgakoff.tk/json/collection.php?c=categories&s=title&q=" +
          JSON.stringify(condition)
      );
      request.onreadystatechange = function() {
        if (request.status === 200 && request.responseText != "") {
          document.getElementById("root-list").innerHTML = "";
          document.getElementById("subfolder-list").innerHTML = "";
          document.getElementById("notes-list").innerHTML = "";
          document.getElementById("content").innerHTML = "";
          JSON.parse(request.responseText).forEach(function(entry) {
            document.getElementById("root-list").appendChild(
              application.util.listItem(
                "http://bulgakoff.tk/folder.svg",
                entry.title,
                function(event) {
                  document
                    .getElementById("root-list")
                    .childNodes.forEach(function(e) {
                      e.className = "list-item";
                    });
                  this.className = "list-item selected";
                  application.loaders.subfolder(entry.id);
                }
              )
            );
          });
        }
      };
      request.send();
    },
    subfolder: function(parentId) {
      let request = new XMLHttpRequest();
      let condition = { parent: parentId };
      request.open(
        "GET",
        "https://bulgakoff.tk/json/collection.php?c=categories&s=title&q=" +
          JSON.stringify(condition)
      );
      request.onreadystatechange = function() {
        if (request.status === 200 && request.responseText !== "") {
          document.getElementById("subfolder-list").innerHTML = "";
          document.getElementById("notes-list").innerHTML = "";
          document.getElementById("content").innerHTML = "";
          JSON.parse(request.responseText).forEach(function(entry) {
            document.getElementById("subfolder-list").appendChild(
              application.util.listItem(
                "http://bulgakoff.tk/folder.svg",
                entry.title,
                function(event) {
                  document
                    .getElementById("subfolder-list")
                    .childNodes.forEach(function(e) {
                      e.className = "list-item";
                    });
                  this.className = "list-item selected";
                  application.loaders.notes(entry.id);
                }
              )
            );
          });
        }
      };
      request.send();
    },
    notes: function(parentId) {
      let request = new XMLHttpRequest();
      let condition = { category: parentId };
      request.open(
        "GET",
        "https://bulgakoff.tk/json/collection.php?c=notes&s=title&q=" +
          JSON.stringify(condition)
      );
      request.onreadystatechange = function() {
        if (request.status === 200 && request.responseText !== "") {
          document.getElementById("notes-list").innerHTML = "";
          document.getElementById("content").innerHTML = "";
          JSON.parse(request.responseText).forEach(function(entry) {
            document.getElementById("notes-list").appendChild(
              application.util.listItem(
                "http://bulgakoff.tk/note.svg",
                entry.title,
                function(event) {
                  document
                    .getElementById("notes-list")
                    .childNodes.forEach(function(e) {
                      e.className = "list-item";
                    });
                  this.className = "list-item selected";
                  application.loaders.note(entry.id);
                }
              )
            );
          });
        }
      };
      request.send();
    },
    note: function(id) {
      let request = new XMLHttpRequest();
      let condition = { id: id };
      request.open(
        "GET",
        "https://bulgakoff.tk/json/collection.php?c=notes&s=title&q=" +
          JSON.stringify(condition)
      );
      request.onreadystatechange = function() {
        if (request.status === 200 && request.responseText !== "") {
          document.getElementById("content").innerHTML = "";
          let result = JSON.parse(request.responseText);
          switch (result.length) {
            case 0:
              document.getElementById("content").innerHTML =
                "Something went wrong. id[" + id + "] brought no result";
              break;
            case 1:
              document.getElementById("content").innerHTML = result[0].content;
              break;
            default:
              document.getElementById("content").innerHTML =
                "Something went wrong. id[" +
                id +
                "] brought more than one result";
              break;
          }
        }
      };
      request.send();
    }
  }
};

document.getElementById("toolbar-refresh").onclick = function(event) {
  application.loaders.root();
};
