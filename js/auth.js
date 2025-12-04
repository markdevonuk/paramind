/* ============================================
   PARAMIND - Authentication Functions
   ============================================ */

// Auth state management
const authState = {
    user: null,
    userData: null,
    isLoading: true
};

// Listen for auth state changes
firebase.auth().onAuthStateChanged(async (user) => {
    authState.isLoading = false;
    
    if (user) {
        // User is signed in
        authState.user = user;
        console.log('User signed in:', user.email);
        
        // Get user data from Firestore
        try {
            const userDoc = await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .get();
            
            if (userDoc.exists) {
                authState.userData = userDoc.data();
                console.log('User data loaded:', authState.userData);
                
                // Store in localStorage for quick access
                window.paramind.storage.setUser({
                    uid: user.uid,
                    email: user.email,
                    trust: authState.userData.trust,
                    trustFullName: authState.userData.trustFullName,
                    subscriptionStatus: authState.userData.subscriptionStatus
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
        
        // Redirect to chat if on login/register page
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            window.location.href = 'chat.html';
        }
    } else {
        // User is signed out
        authState.user = null;
        authState.userData = null;
        window.paramind.storage.clearUser();
        console.log('User signed out');
        
        // Redirect to login if on protected page
        if (window.location.pathname.includes('chat.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Register new user
async function registerUser(email, password, trustAbbreviation) {
    try {
        // Create user in Firebase Auth
        const userCredential = await firebase.auth()
            .createUserWithEmailAndPassword(email, password);
        
        const user = userCredential.user;
        console.log('User created:', user.uid);
        
        // Get trust full name
        const trustFullName = window.paramind.TRUSTS[trustAbbreviation] || trustAbbreviation;
        
        // Create user document in Firestore
        await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .set({
                uid: user.uid,
                email: email,
                trust: trustAbbreviation,
                trustFullName: trustFullName,
                subscriptionStatus: 'free',
                stripeCustomerId: null,
                dailyMessageCount: 0,
                lastMessageDate: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        
        console.log('User document created in Firestore');
        
        return { success: true, user: user };
        
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const userCredential = await firebase.auth()
            .signInWithEmailAndPassword(email, password);
        
        console.log('User logged in:', userCredential.user.email);
        return { success: true, user: userCredential.user };
        
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// Logout user
async function logoutUser() {
    try {
        await firebase.auth().signOut();
        console.log('User logged out');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

// Send password reset email
async function resetPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// Get current user data from Firestore
async function getCurrentUserData() {
    const user = firebase.auth().currentUser;
    if (!user) return null;
    
    try {
        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();
        
        return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

// Update user's daily message count
async function updateMessageCount() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    try {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        
        // Check if it's a new day
        let newCount = 1;
        if (userData.lastMessageDate) {
            const lastDate = userData.lastMessageDate.toDate();
            lastDate.setHours(0, 0, 0, 0);
            
            if (lastDate.getTime() === today.getTime()) {
                // Same day, increment count
                newCount = (userData.dailyMessageCount || 0) + 1;
            }
            // Different day, reset to 1
        }
        
        await userRef.update({
            dailyMessageCount: newCount,
            lastMessageDate: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return newCount;
    } catch (error) {
        console.error('Error updating message count:', error);
        return null;
    }
}

// Check if user can send message (free tier limit)
async function canSendMessage() {
    const user = firebase.auth().currentUser;
    if (!user) return false;
    
    try {
        const userDoc = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get();
        
        const userData = userDoc.data();
        
        // Pro users have unlimited messages
        if (userData.subscriptionStatus === 'active') {
            return true;
        }
        
        // Check daily limit for free users
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (userData.lastMessageDate) {
            const lastDate = userData.lastMessageDate.toDate();
            lastDate.setHours(0, 0, 0, 0);
            
            if (lastDate.getTime() === today.getTime()) {
                // Same day, check count
                return (userData.dailyMessageCount || 0) < 5;
            }
        }
        
        // Different day or no messages yet
        return true;
        
    } catch (error) {
        console.error('Error checking message limit:', error);
        return false;
    }
}

// Convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password. Please try again.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.'
    };
    
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

// Export functions for use in other files
window.paramindAuth = {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    getCurrentUserData,
    updateMessageCount,
    canSendMessage,
    authState
};
