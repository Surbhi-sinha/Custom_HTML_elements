class expandingList extends HTMLUListElement{
      constructor(){
            // calling the parent element Constructor
            self = super();
      }
      //handling behavior
      connectedCallback(){
            //creting the child elements
            const uls = Array.from(self.querySelectorAll("ul"));
            const lis = Array.from(self.querySelectorAll("li"));


            //hide all the childs uls
            uls.forEach((ul) => {
                  ul.style.display = "none";
            });

            lis.forEach((li)=>{
                  //if the li has a ul as a child , add a click handler
                  if(li.querySelectorAll("ul").length > 0){
                        li.setAttribute("class" , "closed");
                        

                        //wrapping the li element in the new span element
                        const childText = li.childNodes[0];
                        const newSpan = document.createElement("span");
                        newSpan.textContent = childText.textContent;
                        newSpan.style.cursor = "pointer";

                        newSpan.addEventListener("click" , (e)=> {
                              const nextul = e.target.nextElementSibling;

                              //setting up the toggler
                              if(nextul.style.display == "block"){
                                    nextul.style.display = "none";
                                    nextul.parentNode.setAttribute("class" , "closed")
                              }else{
                                    nextul.style.display = "block";
                                    nextul.parentNode.setAttribute("class" , "open");
                              }
                        })

                        childText.parentNode.insertBefore(newSpan , childText);
                        childText.parentNode.removeChild(childText);
                  }
                  // li.style.display = "none";
            })
      }


}


//registering the Element
customElements.define("expanding-list" , expandingList , {extends : "ul"});