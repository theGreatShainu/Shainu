
    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
      }

      setTimeout(function() {
      that.tick();
      }, delta);
  };

  window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
  };


 
    let arrayVids=[];
          fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=UU1VDpWpOf36CuP9fowyDZtQ&key=AIzaSyC1qeQOUKy7dNZPbiv0U_x9N3UZqQNqzRc')
          .then(res => {
             return res.json();
           })
          .then(data=>{
            data.items.forEach((curr,index) => {
            let vidTitle = curr.snippet.title;
            let medThumbnail = curr.snippet.thumbnails.medium.url;
            let vidURL = 'https://www.youtube.com/watch?v='+curr.contentDetails.videoId;
            let markup=`<a href ='${vidURL}}' target='_blank'><center><img src='${medThumbnail}' width="150px"/></center><br>${vidTitle}<br>`;
            
            arrayVids.push(markup);
           
             });
        
          var html = `<div style="overflow-x:auto"><table><tr>`, perRow = 2;
            for (i=0; i<arrayVids.length; i++){
              html+=`<td>${arrayVids[i]}</td>`;
              var next = i+1;

              if (next%perRow ==0 && next!=arrayVids.length){
                html+="</tr><tr>";
              }
            }
            html+=`</tr></table>`;
            document.getElementById("apiResult").innerHTML = html;

           })
           
           