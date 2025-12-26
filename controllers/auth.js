import userService from '../services/user.js'
import authService from '../services/auth.js'
import emailService from '../services/email.js'

const controller = {
  register: async function (req, res) {
    const { email, password } = req.body;
    const found = await userService.findByEmail(email);
    if (found) {
      return res.status(409).json({ message: 'Email exists' });
    }
    
    const otp = await authService.generateOTP();

    const result = await userService.create({
      email,
      encryptedPassword: await authService.hashPassword(password),
      otp,
      isActive: false 
    });

    await emailService.send(email, 'Verify Account', `Your OTP is ${otp}`);

    res.status(201).json({ id: result.id, email: result.email });
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    const found = await userService.findByEmail(email);
    
    if (!found) {
      return res.status(401).json({ message: 'Email/Password invalid' });
    }

    if (!found.isActive) { 
      return res.status(403).json({ message: 'Account not activated. Please verify OTP.' });
    }

    const result = await authService.validatePassword(password, found.encryptedPassword);
    if (!result) {
      return res.status(401).json({ message: 'Email/Password invalid' });
    }

    const token = await authService.generateToken({
      id: found.id,
      email: found.email,
      isAdmin: found.isAdmin,
    });
    res.status(200).json({ token });
  },

  getCurrentUser: async function (req, res) {
    const { currentUser } = req;
    res.status(200).json({
      id: currentUser.id,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
    });
  },

  activate: async function (req, res) {
    const { email, otp } = req.body;
    const found = await userService.findByEmail(email);

    if (!found || found.isActive || String(otp) !== String(found.otp)) {
      return res.status(400).json({ message: 'Invalid OTP or User already active' });
    }

    found.otp = null;
    found.isActive = true; 
    
    await userService.update(found);
    res.status(200).json({ message: 'Account activated successfully' });
  }
}

export default controller;