const User = require('./../../models/users'); // Import your User model

async function createAdminUser() {
    try {
        // Check if admin user already exists
        const adminUser = await User.findOne({ login: 'admin' });
        if (!adminUser) {
            // Create admin user if not exists
            const newUser = new User({
                login: 'admin',
                password: 'admin123', // Set a secure password for the admin user
                role: "admin", // Assign admin privileges to this user
            });

            await newUser.save();
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

module.exports = {
    createAdminUser
};