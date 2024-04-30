let toggle_btn = document.getElementById("toggle-theme-btn");
let toggle_area = document.querySelector(".toggle-btn");
toggle_area.addEventListener("click", function () {
  let res = toggle_area.classList.toggle("light-theme");
  document.body.classList.toggle("light");
  console.log(res);
  res === true
    ? localStorage.setItem("theme", "light-theme")
    : localStorage.setItem("theme", "dark-theme");
});
if (localStorage.getItem("theme") === "light-theme") {
  toggle_area.classList.add("light-theme");
  document.body.classList.add("light");
}

let data = "";
fetch("/data.json").then((success) => {
  let result = success.json();
  result.then((allData) => {
    let main_cards = document.querySelector(".main-cards");
    let secondary_cards = document.querySelector(".secondary-cards");
    secondary_cards.classList.add("secondary-cards");

    // Main cards creation
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].id.includes("m-card")) {
        // All card elements
        let m_card = document.createElement("div");
        let top_card = document.createElement("div");
        let mid_card = document.createElement("div");
        let btm_card = document.createElement("div");
        let user_name = document.createElement("span");
        let card_logo = document.createElement("img");
        let followers_num = document.createElement("p");
        let followers_word = document.createElement("p");
        followers_word.innerText = "FOLLOWERS";
        followers_word.classList.add("followers");
        let today_reach = document.createElement("p");

        //adding classes to the main divs
        m_card.classList.add("m-card");
        m_card.classList.add("center-elements");
        top_card.classList.add("social-media-name-and-logo");
        mid_card.classList.add("num-of-followers");
        btm_card.classList.add("main-today");

        //define the card type for the top border color
        if (allData[i]["social-media-platform"] === "facebook") {
          m_card.classList.add("facebook-main-card");
        }
        if (allData[i]["social-media-platform"] === "twitter") {
          m_card.classList.add("twitter-main-card");
        }
        if (allData[i]["social-media-platform"] === "instagram") {
          m_card.classList.add("instagram-main-card");
        }
        if (allData[i]["social-media-platform"] === "youtube") {
          m_card.classList.add("youtube-main-card");
          followers_word.innerText = "SUBSCRIPERS";
        }

        //Top card elements
        user_name.id = "user-name";
        user_name.innerText = allData[i]["user-name"];
        card_logo.src = allData[i]["card-logo"];
        card_logo.id = "card-logo";
        top_card.appendChild(user_name);
        top_card.appendChild(card_logo);
        m_card.appendChild(top_card);

        //Mid card elements
        followers_num.innerText = allData[i]["num-of-followers"];
        followers_num.classList.add("f-num");
        mid_card.appendChild(followers_num);
        mid_card.appendChild(followers_word);
        m_card.appendChild(mid_card);

        //Bottom card elements
        today_reach.innerText = `${allData[i]["today-reach"]} Today`;
        btm_card.appendChild(today_reach);
        if (allData[i]["today-state"] === "up") {
          today_reach.style.color = "var(--lime-green)";
          let pseudo_before = document.createElement("div");
          pseudo_before.classList.add("psuedo-before-up");
          today_reach.prepend(pseudo_before);
        } else if (allData[i]["today-state"] === "down") {
          today_reach.style.color = "var(--bright-red)";
          let pseudo_before = document.createElement("div");
          pseudo_before.classList.add("psuedo-before-down");
          today_reach.prepend(pseudo_before);
        }
        m_card.appendChild(btm_card);

        //Append all elements to the card
        main_cards.appendChild(m_card);
      }

      // Secondary cards creation
      else if (allData[i].id.includes("s-card")) {
        // All card elements
        let s_card = document.createElement("div");
        let top_card = document.createElement("div");
        let btm_card = document.createElement("div");
        let activity_type = document.createElement("p");
        let card_logo = document.createElement("img");
        let activity_count = document.createElement("p");
        let change_percentage = document.createElement("p");

        //adding classes to the main divs
        s_card.classList.add("s-card");
        top_card.classList.add("up");
        btm_card.classList.add("down");

        //Top card elements
        activity_type.innerText = allData[i]["reach-type"];
        card_logo.src = allData[i]["card-logo"];
        card_logo.id = "card-logo";
        top_card.appendChild(activity_type);
        top_card.appendChild(card_logo);
        s_card.appendChild(top_card);

        //Bottom card elements
        activity_count.innerText = allData[i]["reach-num"];
        activity_count.classList.add("num-of-views");
        change_percentage.innerText = allData[i]["today-reach"];
        change_percentage.classList.add("view-change-percentage");
        if (allData[i]["today-state"] === "up") {
          change_percentage.style.color = "var(--lime-green)";
          let pseudo_before = document.createElement("div");
          pseudo_before.classList.add("psuedo-before-up");
          change_percentage.prepend(pseudo_before);
        } else if (allData[i]["today-state"] === "down") {
          change_percentage.style.color = "var(--bright-red)";
          let pseudo_before = document.createElement("div");
          pseudo_before.classList.add("psuedo-before-down");
          change_percentage.prepend(pseudo_before);
        }

        btm_card.appendChild(activity_count);
        btm_card.appendChild(change_percentage);
        s_card.appendChild(btm_card);

        //Append all elements to the card
        secondary_cards.appendChild(s_card);
      }
    }

    console.log("data loaded");
  });
});
