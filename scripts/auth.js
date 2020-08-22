
//  Auth state change
auth.onAuthStateChanged(user=>{
    // console.log(user);
    if (user) {
            console.log("user exist");

             // reference for firestore 
             // real time listner instead of get().then()
            db.collection("guides")
            .onSnapshot(snapshot=>{
                // console.log(snapshot.docs);
                setupGuides(snapshot.docs);
                setupUi(user);
            },err=>{
                console.log(err.message);
            })
           
    } else {
        console.log("user logged out");
        setupGuides([]);
        setupUi();
    }
})


//  create new guide
const createForm = document.querySelector("#create-form")
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection("guides").add({
        title: createForm['title'].value,
        content: createForm['content'].value})
    .then(()=>{
        // closing the modal
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
    .catch(err=>{
        console.log(err.message);
    })
})




// signup
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const bio = signupForm['signup-bio'].value;
    console.log(email,password);

    // signup user
    auth.createUserWithEmailAndPassword(email,password)
    .then(Credential=>{
      //  console.log(Credential);
      
      return db.collection("users").doc(Credential.user.uid).set({
        bio: bio
      });

       
    }).then(()=>{
        // closing the modal
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })

})


// logout
 const logout = document.querySelector('#logout');
logout.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut()
    .then(()=>{
        // console.log("user logged out.");
    })
});


/// login 
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit',(e)=>{
e.preventDefault();

// login info
const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

auth.signInWithEmailAndPassword(email, password)
.then(userCred=>{
    console.log(userCred);

     // closing the modal
     const modal = document.querySelector("#modal-login");
     M.Modal.getInstance(modal).close();
     loginForm.reset();
})
})





