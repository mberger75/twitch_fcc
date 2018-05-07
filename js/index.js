const channels = [];

$.getJSON("js/top_streamers_fr.json", data => {
  for (let i=0 ; i<data.length ; i++) {
    channels.push(data[i].FIELD13)
  }
})
const getChannelInfo = () => {
  channels.forEach(channel => {
    const makeURL = (type, name) => { return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`; };
    $.getJSON(makeURL("streams", channel), data => {
      var game,
      status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game.toLowerCase();
        game = game.replace(/\b\w/g, str => str.toUpperCase());
        status = "online";
      }
      $.getJSON(makeURL("channels", channel), data => {
        var logo = data.logo,
        name = data.display_name,
        description = status;
        if (logo !== null) { logo } "http://www.royallepagesudbury.ca/images/no-image.png"
          if (name !== null) { name } channel
          if (description == "online") { `: ${data.status}` }  `""`
              htmlPush = 
            `<a href="${data.url}" id="link" target="_blank">
            <ul id="streamerList" class="${status} col-md-3">
            <li id="name">${name}</li>
            <li id="streaming">Now: ${game}</li>
            <li id="icon"><img src="${logo}" class="logo"></li></a>
            </ul></a>`;
          if (status === "online") {
            return $("#display").prepend(htmlPush);
            }
          $("#display").append(htmlPush);
      });
    });
  });
};
$(document).ready(() => {
  getChannelInfo();
  $(".selector").on("mousedown", function() {
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr("id");
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } 
    else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    }
    else { 
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })
});