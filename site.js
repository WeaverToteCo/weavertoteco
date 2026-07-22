
const toggle=document.getElementById("menuToggle");
const nav=document.getElementById("navLinks");
if(toggle&&nav){
 toggle.addEventListener("click",()=>nav.classList.toggle("open"));
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}
const dateInput=document.getElementById("date");
if(dateInput){
 const now=new Date();
 dateInput.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().split("T")[0];
}
document.querySelectorAll("[data-package]").forEach(link=>{
 link.addEventListener("click",()=>{
  sessionStorage.setItem("selectedPackage",link.dataset.package);
 });
});
const packageSelect=document.getElementById("package");
if(packageSelect){
 const saved=sessionStorage.getItem("selectedPackage");
 if(saved) packageSelect.value=saved;
}
const form=document.getElementById("bookingForm");
if(form){
 form.addEventListener("submit",async e=>{
  e.preventDefault();
  const submitButton=form.querySelector('button[type="submit"]');
  const status=document.getElementById("formStatus");
  submitButton.disabled=true;
  submitButton.textContent="Sending...";
  status.style.display="none";

  try{
   const response=await fetch(form.action,{
    method:"POST",
    body:new FormData(form),
    headers:{Accept:"application/json"}
   });

   if(response.ok){
    form.reset();
    status.textContent="Thank you! Your booking request has been sent. We will follow up to confirm availability.";
    status.style.color="#17823b";
    status.style.display="block";
    sessionStorage.removeItem("selectedPackage");
   }else{
    const data=await response.json().catch(()=>({}));
    throw new Error(data?.errors?.map(error=>error.message).join(", ") || "Submission failed");
   }
  }catch(error){
   status.textContent="We couldn't send your request. Please call or text 770-584-8065.";
   status.style.color="#bd1228";
   status.style.display="block";
  }finally{
   submitButton.disabled=false;
   submitButton.textContent="Send Booking Request";
  }
 });
}
