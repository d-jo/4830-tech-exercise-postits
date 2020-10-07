
function submitPostit() {
  auth = $("#author").val();
  content = $("#content").val();
  dat = {
    "Author": auth,
    "Content": content
  }
  $.ajax({
    type: "POST",
    url: "/insert",
    data: JSON.stringify(dat),
    success: (data) => {
      loadNotes();
    },
    error: (err) => {
      loadNotes();
    },
    dataType: "json"
  })
}

function loadNotes() {
  $(".postits").empty();
  $.ajax({
    type: "GET",
    url: "/latest",
    success: (data) => {
      console.log("Recieved data from server")
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        let wrap = $("<div class='postit-container'></div>");  
        let head = $("<div class='postit-header'></div>");
        let cont = $("<div class='postit-content'></div>");
        let text = $("<p></p>").text(data[i]["Content"]);
        cont = cont.append(text);
        let ele = $("<h3></h3>").text("[" + data[i]['ID'] + "] " + data[i]["Author"]);
        head = head.append(ele);
        wrap = wrap.append(head, cont);
        $(".postits").append(wrap);
      }
    },
    error: (err) => {
      console.log('err')
      console.log(err)
    },
    dataType: "json"
  })
}

function searchNotes() {
  $(".postits").empty();
  $.ajax({
    type: "POST",
    url: "/search",
    data: JSON.stringify({
      Keyword: $("#search").val()
    }),
    success: (data) => {
      console.log("Recieved data from server")
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        let wrap = $("<div class='postit-container'></div>");  
        let head = $("<div class='postit-header'></div>");
        let cont = $("<div class='postit-content'></div>");
        let text = $("<p></p>").text(data[i]["Content"]);
        cont = cont.append(text);
        let ele = $("<h3></h3>").text("[" + data[i]['ID'] + "] " + data[i]["Author"]);
        head = head.append(ele);
        wrap = wrap.append(head, cont);
        $(".postits").append(wrap);
      }
    },
    error: (err) => {
      console.log('err')
      console.log(err)
    },
    dataType: "json"
  })
}

$(() => {
  console.log("Document ready");
  loadNotes()
})