(function() {
  "use strict"; // Start of use strict

  var sidebar = document.querySelector('.sidebar');
  var sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop');

  if (sidebar) {
    
    var collapseEl = sidebar.querySelector('.collapse');
    var collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'))
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    for (var toggle of sidebarToggles) {

      // Toggle the side navigation
      toggle.addEventListener('click', function(e) {
        document.body.classList.toggle('sidebar-toggled');
        sidebar.classList.toggle('toggled');

        if (sidebar.classList.contains('toggled')) {
          for (var bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        };
      });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function() {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 768) {
        for (var bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      };
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  
  var fixedNaigation = document.querySelector('body.fixed-nav .sidebar');
  
  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function(e) {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }

  var scrollToTop = document.querySelector('.scroll-to-top');
  
  if (scrollToTop) {
    
    // Scroll to top button appear
    window.addEventListener('scroll', function() {
      var scrollDistance = window.pageYOffset;

      //check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }

})(); // End of use strict
    function publishToTable() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const category = document.getElementById('category').value;
        if (name && email) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '/' + mm + '/' + dd;
            const tableElement = document.getElementById('tableBody');
            const trElement = document.createElement('tr');
            var row = tableElement.insertRow(0);
            var firstRow = document.getElementById("tableBody").rows[0];
            const dateEle = firstRow.insertCell(0);
            const categoryEle = firstRow.insertCell(0);
            const telephoneEle = firstRow.insertCell(0);
            const emailEle = firstRow.insertCell(0);
            const nameEle = firstRow.insertCell(0);
            nameEle.innerHTML = name;
            emailEle.innerHTML = email;
            dateEle.innerHTML = today;
            telephoneEle.innerHTML = telephone;
            categoryEle.innerHTML = category;
        }
    }
    function sendData(){
        var url = "https://api.openai.com/v1/chat/completions";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        // console.log("hi");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "${API_KEY}");

        xhr.onreadystatechange = function () {
        console.log(xhr.status);
        console.log(xhr.responseText);
        open_ai_response = xhr.responseText;
        console.log(open_ai_response);
        var json = JSON.parse(open_ai_response)
        document.getElementById('response').value = json.choices[0].message.content; document.getElementById("loader").classList.add('invisible');
document.getElementById("wait").classList.add('invisible');
         };
                
        var data = `{
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Generate a Proposed Endeavor plan for NIW based on the following question and answers. The document needs to be 5 pages long and the language should be written in third person. 1.Full Name and any other identifying details you might need for the document:${this.document.getElementById('first-question').value} 2.Current occupation and employer: ${this.document.getElementById('second-question').value} 3.Work experience: What roles have they held, at which organizations, and what responsibilities did they have?: ${this.document.getElementById('third-question').value} 4.Education: What degrees or certifications do they hold, and where did they receive them from?${this.document.getElementById('fourth-question').value} 5.Future plans: What is their proposed endeavor in the United States? Why do they believe it would be beneficial for the country?${this.document.getElementById('fifth-question').value} 6.Contributions to their field: Do they have any noteworthy accomplishments, awards, or recognitions? ${this.document.getElementById('sixth-question').value} 7.Publications: Have they published any papers or articles? What were the impacts of these publications? ${this.document.getElementById('seventh-question').value} 8.References: Do they have references or letters from others in their field supporting their contributions and future plans ${this.document.getElementById('eighth-question').value}"}],
            "temperature": 0.7
        }`;
        // data.messages[1] = document.getElementById('first-question').value;
        // console.log(data);
        xhr.send(data);
        document.getElementById("loader").classList.remove('invisible');
         document.getElementById("wait").classList.remove('invisible');
        console.log(xhr.status);
        
    }
