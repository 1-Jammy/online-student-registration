'use client';

import React, { useState, useEffect } from 'react';
import { FaBook, FaCog, FaBell, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: 'Active' | 'Inactive';
  removed?: boolean;
}

interface Course {
  id: number;
  name: string;
  instructor: string;
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@gmail.com', course: 'CS', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@gmail.com', course: 'Business', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@gmail.com', course: 'Engineering', status: 'Active' },
  ]);
  const [lastRemoved, setLastRemoved] = useState<Student | null>(null);
  const [activePage, setActivePage] = useState('Courses');
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [language, setLanguage] = useState('English');
  const [notices, setNotices] = useState<{ title: string; content: string }[]>([]);
const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
const [newNoticeTitle, setNewNoticeTitle] = useState('');
const [newNoticeContent, setNewNoticeContent] = useState('');

const [showEditNoticeModal, setShowEditNoticeModal] = useState(false);
const [editNoticeIndex, setEditNoticeIndex] = useState<number | null>(null);
const [editedNoticeTitle, setEditedNoticeTitle] = useState('');
const [editedNoticeContent, setEditedNoticeContent] = useState('');

  

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('');

  const handleAddStudent = () => {
    if (!newStudentName || !newStudentEmail || !newStudentCourse) return;

    const newStudent: Student = {
      id: Date.now(),
      name: newStudentName,
      email: newStudentEmail,
      course: newStudentCourse,
      status: 'Active',
    };

    setStudents([...students, newStudent]);
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentCourse('');
    setShowAddStudentModal(false);
  };

  const [eventTitle, setEventTitle] = useState('Annual Science Fair');
  const [eventBannerUrl, setEventBannerUrl] = useState('https://via.placeholder.com/800x200');
  const [eventDescription, setEventDescription] = useState('Join us for the Annual Science Fair.');
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [editedTitle, setEditedTitle] = useState(eventTitle);
  const [editedBannerUrl, setEditedBannerUrl] = useState(eventBannerUrl);
  const [editedDescription, setEditedDescription] = useState(eventDescription);
  const pages = ['Courses', 'Settings', 'Notices', 'Events', 'Students'];

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Computer Science', instructor: 'Prof. A' },
    { id: 2, name: 'Business Management', instructor: 'Prof. B' },
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newInstructor, setNewInstructor] = useState('');

  const handleRemove = (id: number) => {
    const updated = students.map((s) => (s.id === id ? { ...s, removed: true } : s));
    setLastRemoved(students.find((s) => s.id === id) || null);
    setStudents(updated);
  };

  const handleUndo = () => {
    if (lastRemoved) {
      const updated = students.map((s) =>
        s.id === lastRemoved.id ? { ...s, removed: false } : s
      );
      setStudents(updated);
      setLastRemoved(null);
    } else {
      alert('Nothing to undo.');
    }
  };

  const handleAddCourse = () => {
    if (!newCourseName || !newInstructor) return;
    const newCourse: Course = {
      id: Date.now(),
      name: newCourseName,
      instructor: newInstructor,
    };
    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setNewInstructor('');
  };

  const handleRemoveCourse = (id: number) => {
  setCourses(courses.filter((c) => c.id !== id));
};

// 🧩 Add these below
const handleAddNotice = () => {
  if (!newNoticeTitle || !newNoticeContent) return;
  setNotices([...notices, { title: newNoticeTitle, content: newNoticeContent }]);
  setNewNoticeTitle('');
  setNewNoticeContent('');
  setShowAddNoticeModal(false);
};

const handleEditNotice = () => {
  if (editNoticeIndex === null || !editedNoticeTitle || !editedNoticeContent) return;

  const updated = [...notices];
  updated[editNoticeIndex] = {
    title: editedNoticeTitle,
    content: editedNoticeContent,
  };
  setNotices(updated);
  setShowEditNoticeModal(false);
};

const handleDeleteNotice = (index: number) => {
  const updated = [...notices];
  updated.splice(index, 1);
  setNotices(updated);
};


  return (
<div className="flex h-screen bg-yellow-50 relative overflow-hidden">
  {/* Yellow Wave Background */}
  <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-tr-[4rem] z-0" />

  {/* Sidebar with Glass Effect */}
  <motion.aside
    initial={{ x: -80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative z-10 w-64 bg-white/30 backdrop-blur-lg text-yellow-800 shadow-xl flex flex-col p-4 rounded-tr-3xl"
  >
    <h1 className="text-2xl font-bold mb-6 text-yellow-600">🎓 Admin-Dashboard</h1>

    <nav className="space-y-2 flex-grow">
      {pages.map((page) => {
        const isActive = activePage === page;
        return (
          <motion.button
            key={page}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage(page)}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg w-full text-left font-medium transition-all duration-200 ${
              isActive
                ? "bg-yellow-100/60 text-yellow-800 backdrop-blur-sm shadow-inner"
                : "hover:bg-yellow-100/50 hover:text-yellow-700"
            }`}
          >
            {{
              Courses: <><FaBook /> Courses</>,
              Settings: <><FaCog /> Settings</>,
              Notices: <><FaBell /> Notices</>,
              Events: <><FaCalendarAlt /> Events</>,
              Students: <><FaUser /> Students</>,
            }[page]}
          </motion.button>
        );
      })}
    </nav>
  </motion.aside>

      

{/* Main Content */}
<main className="flex-1 p-6 overflow-auto">
  {/* Top Bar */}
  <div className="flex justify-between items-center mb-6 relative">
    
    {/* Animated Search Input */}
    <motion.input
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      type="text"
      placeholder="Search"
      className="w-1/3 px-4 py-2 border border-gray-300 rounded"
    />

    {/* Profile Section */}
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowAdminInfo((prev) => !prev)}
      >
        <span className="text-sm font-medium">Admin</span>
        <motion.img
          whileHover={{ rotate: 5 }}
          src="https://i.pravatar.cc/40?img=68"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
      </motion.div>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {showAdminInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10"
          >
            <div className="p-4 text-sm">
              <p className="font-medium">Admin</p>
              <p className="text-gray-600">admin@example.com</p>
            </div>
            <motion.button
              whileHover={{ backgroundColor: "#f3f4f6" }} // Tailwind: gray-100
              className="block w-full text-left px-4 py-2 text-sm text-red-600"
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>

        {/* Sections */}
        {activePage === 'Courses' && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Course Name"
                className="px-4 py-2 border rounded w-full"
              />
              <input
                type="text"
                value={newInstructor}
                onChange={(e) => setNewInstructor(e.target.value)}
                placeholder="Instructor"
                className="px-4 py-2 border rounded w-full"
              />
              <button
                onClick={handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Course
              </button>
            </div>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
                >
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCourse(course.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activePage === 'Settings' && (
          <div className="bg-white dark:bg-gray-700 p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
            <div className="flex items-center justify-between">
              <label htmlFor="darkModeToggle" className="font-medium">🌗 Dark Mode</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="darkModeToggle"
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300">
                  <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`}></div>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="language" className="block mb-1 font-medium">🌐 Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
          </div>
        )}

        {activePage === 'Notices' && (
  <div className="bg-white p-6 rounded shadow space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">📢 Notices</h2>
      <button
        onClick={() => setShowAddNoticeModal(true)}
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
      >
        + Add Notice
      </button>
    </div>

    {/* Notice List */}
    {notices.length === 0 ? (
      <p className="text-gray-500">No notices posted yet.</p>
    ) : (
      <ul className="space-y-4">
        {notices.map((notice, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">{notice.title}</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditNoticeIndex(index);
                    setEditedNoticeTitle(notice.title);
                    setEditedNoticeContent(notice.content);
                    setShowEditNoticeModal(true);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNotice(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700">{notice.content}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
)}


        {activePage === 'Events' && (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Events</h2>
              <button
                onClick={() => {
                  if (isEditingEvent) {
                    setEventTitle(editedTitle);
                    setEventBannerUrl(editedBannerUrl);
                    setEventDescription(editedDescription);
                  }
                  setIsEditingEvent(!isEditingEvent);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditingEvent ? 'Save Changes' : 'Edit'}
              </button>
            </div>
            {isEditingEvent ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Event Title"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setEditedBannerUrl(imageUrl);
                    }
                  }}
                  className="w-full px-4 py-2 border rounded"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Event Description"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={eventBannerUrl}
                  alt="Event Banner"
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-2xl font-semibold">{eventTitle}</h3>
                <p className="text-gray-700">{eventDescription}</p>
              </div>
            )}
          </div>
        )}

        {activePage === 'Students' && (
          <>
            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-semibold">👥 Students</h2>
              <div className="flex gap-4">
                {lastRemoved && (
                  <button
                    onClick={handleUndo}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Undo remove
                  </button>
                )}
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  + Add Student
                </button>
              </div>
            </div>

            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Course Applied</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {students.filter((s) => !s.removed).map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </td>
                    <td className="px-6 py-4">{student.course}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemove(student.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Add Student Modal */}
        {showAddStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  value={newStudentCourse}
                  onChange={(e) => setNewStudentCourse(e.target.value)}
                  placeholder="Course"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="text-sm px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
