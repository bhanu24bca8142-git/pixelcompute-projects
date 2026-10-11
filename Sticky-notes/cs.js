let input=document.querySelector("input");
let addnote = document.querySelector(".addnote1");
let noteList = document.querySelector(".notesList");
let count =0;    
let colors=["#d1e1ff","#fefffe"];

addnote.addEventListener("click", ()=>{
    let text = input.value.trim();
    if(text !== ""){
        let list = document.createElement("div");
        let removeBtn=document.createElement("button");
        list.innerText = text;
        list.className=`note${count}`;
        list.style.backgroundColor=colors[count%colors.length];
        removeBtn.className="removeBtn";
        removeBtn.innerText="x";
        removeBtn.addEventListener("click",(event)=>{
            event.stopPropagation();
            list.remove();
        });
        list.appendChild(removeBtn);  
        noteList.appendChild(list);
        
        count++;
        input.value = null;
    }
} )

input.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        addnote.click();
    }
});        