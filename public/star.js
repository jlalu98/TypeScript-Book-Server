//creating temaplate
let template=document.createElement("template");

template.innerHTML=`
<link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="/styles.css">
<div class="fa inner" id="starDiv">
</div>
`;
//creating class 
class star extends HTMLElement{
    constructor() {
        //all the features of HTMLElement will be added to star
        super();
    
     //we are traeting it as a shadow element
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        let rating=this.getAttribute("rating");
        let limit=this.getAttribute("maxLimit");

        let newVal=parseFloat(rating)*parseFloat(5)/parseFloat(limit)*15

        this.shadowRoot.querySelector('#starDiv').style.width = `${newVal}px`;
}
}
window.customElements.define('star-rating', star);