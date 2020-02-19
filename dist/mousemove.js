var current_mouse_pos_x = 0;
var current_mouse_pos_y = 0;
var current_touch_pos_x = 0;
var current_touch_pos_y = 0;
var max_distance = 50;
var offset_distance = window.innerWidth / 2;
var normal_mouse_pos_x = current_mouse_pos_x - offset_distance;
var project_titles = document.querySelectorAll(".movable-gallery-project-title");
var movable_gallery_item = document.querySelectorAll(".movable-gallery-item");
var movable_gallery_item_image = document.querySelectorAll(".movable-gallery-image");
var movable_gallery_project_detail = document.querySelectorAll(".movable-gallery-project-detail");
var movable_gallery_number = document.querySelectorAll(".movable-gallery-number");
var is_click_area_active = false;
var cursor = document.querySelector(".cursor");
var mouse_areas_left = document.querySelector(".mouseareas-left");
var mouse_areas_right = document.querySelector(".mouseareas-right");
var number_of_clicks = 0;
var current_cursor_value;
var animation_flag = true;

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobile()) {
  //place script you don't want to run on mobile here
  document.addEventListener("mousemove", e => {
    current_mouse_pos_x = e.clientX;
    current_mouse_pos_y = e.clientY;
  });

  var convert_range = current_position => {
    return ((current_position - -offset_distance) / (offset_distance - -offset_distance)) * (max_distance - -max_distance) + -max_distance;
  };

  function render() {
    normal_mouse_pos_x = current_mouse_pos_x - offset_distance;
    gsap.to(project_titles, 2, {
      x: convert_range(normal_mouse_pos_x),
      ease: "power4.out"
    });

    gsap.to(cursor, {
      duration: 1,
      x: current_mouse_pos_x - cursor.getBoundingClientRect().width / 2,
      y: current_mouse_pos_y - cursor.getBoundingClientRect().height / 2,
      ease: "power4.out"
    });

    if (!is_click_area_active) {
      cursor_change(direction());
    }
    requestAnimationFrame(render);
  }

  var cursor_change = value => {
    if (value === "right") {
      cursor.childNodes[1].src = "assets/arrow_right.svg";
    } else if (value === "left") {
      cursor.childNodes[1].src = "assets/arrow_left.svg";
    } else if (value === "click") {
      cursor.childNodes[1].src = "assets/arrow_click.svg";
    }

    current_cursor_value = value;
  };

  var direction = () => {
    if (current_mouse_pos_x <= offset_distance) {
      return "left";
    } else {
      return "right";
    }
  };

  movable_gallery_item_image.forEach(e => {
    e.addEventListener("mouseenter", () => {
      cursor_change("click");
      is_click_area_active = true;
      gsap.to(e, 1, { css: { transform: "scale(1.05)" }, ease: "power4.out" });
      gsap.to(e.childNodes[1], 1, { scale: 1.25, ease: "power4.out" });
    });
    e.addEventListener("mouseleave", () => {
      cursor_change(direction());
      is_click_area_active = false;
      gsap.to(e, 1, { css: { transform: "scale(1)" }, ease: "power4.out" });
      gsap.to(e.childNodes[1], 1, { scale: 1, ease: "power4.out" });
    });
  });

  document.addEventListener("click", () => {
    if (current_cursor_value === "right" && number_of_clicks < movable_gallery_item.length - 2 && animation_flag === true) {
      animation_flag = false;
      var gallery_item_move_timeline = new gsap.timeline();
      gallery_item_move_timeline
        .to(movable_gallery_item, 2, {
          x: "-=" + (movable_gallery_item[0].getBoundingClientRect().width + 80),
          ease: "power4.inOut"
        })
        .to(movable_gallery_item_image, 1, { scaleX: 1.1, ease: "power4.in" }, 0)
        .to(
          movable_gallery_item_image,
          1,
          {
            scaleX: 1,
            ease: "power4.out",
            onComplete: () => {
              animation_flag = true;
            }
          },
          1
        );
      number_of_clicks++;
    } else if (current_cursor_value === "left" && number_of_clicks > 0 && animation_flag === true) {
      animation_flag = false;
      var gallery_item_move_timeline = new gsap.timeline();
      gallery_item_move_timeline
        .to(movable_gallery_item, 2, {
          x: "+=" + (movable_gallery_item[0].getBoundingClientRect().width + 80),
          ease: "power4.inOut"
        })
        .to(movable_gallery_item_image, 1, { scaleX: 1.1, ease: "power4.in" }, 0)
        .to(
          movable_gallery_item_image,
          1,
          {
            scaleX: 1,
            ease: "power4.out",
            onComplete: () => {
              animation_flag = true;
            }
          },
          1
        );
      number_of_clicks--;
    }
  });

  mouse_areas_left.addEventListener("mouseenter", () => {
    cursor_change("left");
  });

  mouse_areas_right.addEventListener("mouseenter", () => {
    cursor_change("right");
  });

  requestAnimationFrame(render);

  /* x: lerp(0.1, convert_range(project_titles[0].getBoundingClientRect().x), convert_range(normal_mouse_pos_x)), */

  var lerp = (amount, start, end) => {
    return (1 - amount) * start + amount * end;
  };
}

class mouse_move {
  constructor() {
    this.a = 10;
  }
}

var mouse_move_instance = new mouse_move();
