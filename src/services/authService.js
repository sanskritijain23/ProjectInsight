const AUTH_KEY = 'projectdna_auth_user';

export const STUDENT_DEMO_ACCOUNTS = [
  {
    id: "usr-stu-01",
    name: "Nitya Arya",
    email: "nitya.arya@college.edu",
    password: "Nitya@Demo101",
    role: "student",
    rollNumber: "21BCE1001",
    department: "Computer Science & Engineering",
    institution: "Maulana Azad National Institute of Technology, Bhopal",
    semester: "Semester V",
    domainFocus: "AI & Medical Vision",
    bio: "Undergraduate researcher specializing in edge vision-language models and biomedical image segmentation.",
    avatarUrl: null
  },
  {
    id: "usr-stu-02",
    name: "Sanskriti Jain",
    email: "sanskriti.jain@college.edu",
    password: "Sanskriti@Demo102",
    role: "student",
    rollNumber: "21BCE1002",
    department: "Computer Science & Engineering",
    institution: "Maulana Azad National Institute of Technology, Bhopal",
    semester: "Semester V",
    domainFocus: "Cybersecurity & Distributed Systems",
    bio: "Capstone candidate focusing on zero-knowledge SNARK circuits and decentralized academic verification.",
    avatarUrl: null
  },
  {
    id: "usr-stu-03",
    name: "Aradhya Jain",
    email: "aradhya.jain@college.edu",
    password: "Aradhya@Demo103",
    role: "student",
    rollNumber: "21BCE1003",
    department: "Computer Science & Engineering",
    institution: "Maulana Azad National Institute of Technology, Bhopal",
    semester: "Semester V",
    domainFocus: "IoT & Embedded Edge Systems",
    bio: "Hardware and edge-firmware engineer researching LoRaWAN mesh networks and urban heat island telemetry.",
    avatarUrl: null
  },
  {
    id: "usr-stu-04",
    name: "Hemant Dangi",
    email: "hemant.dangi@college.edu",
    password: "Hemant@Demo104",
    role: "student",
    rollNumber: "21BCE1004",
    department: "Computer Science & Engineering",
    institution: "Maulana Azad National Institute of Technology, Bhopal",
    semester: "Semester V",
    domainFocus: "NLP & Legal Tech",
    bio: "NLP researcher working on grounded multilingual legal statute retrieval and argumentation calibration.",
    avatarUrl: null
  }
];

export const FACULTY_DEMO_ACCOUNT = {
  id: "usr-fac-01",
  name: "Dr. K. S. Venkatesh",
  email: "faculty@college.edu",
  password: "faculty123",
  role: "faculty",
  designation: "Associate Professor & Capstone Coordinator",
  department: "Department of Computer Science & Engineering",
  institution: "Maulana Azad National Institute of Technology, Bhopal",
  publications: 42,
  avatarUrl: null
};

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role === 'student' && parsed.semester === 'Semester VII (Capstone)') {
          parsed.semester = 'Semester V';
          try {
            localStorage.setItem(AUTH_KEY, JSON.stringify(parsed));
          } catch (err) {
            console.error("Storage update error", err);
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse auth user:", e);
    }
    // Return null if unauthenticated. Never return demo user automatically.
    return null;
  },

  getStudentAccounts() {
    return STUDENT_DEMO_ACCOUNTS;
  },

  getFacultyAccount() {
    return FACULTY_DEMO_ACCOUNT;
  },

  login(email, password, role = 'student') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const selectedRole = role.toLowerCase();
        let user = null;

        if (selectedRole === 'faculty') {
          user = FACULTY_DEMO_ACCOUNT;
        } else {
          // Match by email among defined student accounts
          const cleanEmail = (email || '').trim().toLowerCase();
          const match = STUDENT_DEMO_ACCOUNTS.find(s => s.email.toLowerCase() === cleanEmail);
          
          if (match) {
            user = { ...match };
          } else {
            // Dynamic fallback with student role
            user = {
              id: `usr-stu-${Date.now()}`,
              name: email ? email.split('@')[0] : "Student Researcher",
              email: email || "student@college.edu",
              role: "student",
              rollNumber: "21BCE1001",
              department: "Computer Science & Engineering",
              institution: "Maulana Azad National Institute of Technology, Bhopal",
              semester: "Semester V"
            };
          }
        }

        try {
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        } catch (e) {
          console.error("Storage error", e);
        }

        resolve(user);
      }, 250);
    });
  },

  switchRole(role) {
    let user;
    if (role === 'faculty') {
      user = FACULTY_DEMO_ACCOUNT;
    } else {
      user = STUDENT_DEMO_ACCOUNTS[0]; // Default to Nitya Arya
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem(AUTH_KEY);
      resolve(true);
    });
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  },

  isFaculty() {
    const user = this.getCurrentUser();
    return user?.role === 'faculty';
  },

  isStudent() {
    const user = this.getCurrentUser();
    return user?.role === 'student';
  }
};
