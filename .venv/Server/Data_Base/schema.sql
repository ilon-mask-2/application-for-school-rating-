PRAGMA foreign_keys = ON;

-- Школы
CREATE TABLE schools (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT
);

-- Пользователи
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    photo TEXT,
    is_active BOOLEAN DEFAULT 1,
    reset_required BOOLEAN DEFAULT 0,
    school_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- Ученики
CREATE TABLE students (
    user_id INTEGER PRIMARY KEY,
    class_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Преподаватели
CREATE TABLE teachers (
    user_id INTEGER PRIMARY KEY,
    homeroom_of_class_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (homeroom_of_class_id) REFERENCES classes(id)
);

-- Социальные работники
CREATE TABLE social_workers (
    user_id INTEGER PRIMARY KEY,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Администраторы
CREATE TABLE admins (
    user_id INTEGER PRIMARY KEY,
    can_manage_admins BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Директора
CREATE TABLE principals (
    user_id INTEGER PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Классы
CREATE TABLE classes (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    homeroom_teacher_id INTEGER,
    FOREIGN KEY (homeroom_teacher_id) REFERENCES teachers(user_id)
);

-- Учебные группы
CREATE TABLE study_groups (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    teacher_id INTEGER,
    subject TEXT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(user_id)
);

-- Привязка учеников к учебным группам
CREATE TABLE student_group_relationships (
    student_id INTEGER,
    group_id INTEGER,
    PRIMARY KEY (student_id, group_id),
    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (group_id) REFERENCES study_groups(id)
);

-- Оценки студентов преподавателям
CREATE TABLE student_to_teacher_ratings (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    teacher_id INTEGER,
    date DATE,
    interest INTEGER,
    comfort INTEGER,
    respect INTEGER,
    clarity INTEGER,
    comment TEXT,
    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(user_id)
);

-- Оценки преподавателей студентам
CREATE TABLE teacher_to_student_ratings (
    id INTEGER PRIMARY KEY,
    teacher_id INTEGER,
    student_id INTEGER,
    date DATE,
    understanding INTEGER,
    effort INTEGER,
    behavior INTEGER,
    punctuality INTEGER,
    comment TEXT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(user_id),
    FOREIGN KEY (student_id) REFERENCES students(user_id)
);

-- Оценки от соц. работников ученикам
CREATE TABLE social_worker_student_ratings (
    id INTEGER PRIMARY KEY,
    worker_id INTEGER,
    student_id INTEGER,
    date DATE,
    wellbeing INTEGER,
    stability INTEGER,
    engagement INTEGER,
    trust INTEGER,
    comment TEXT,
    FOREIGN KEY (worker_id) REFERENCES social_workers(user_id),
    FOREIGN KEY (student_id) REFERENCES students(user_id)
);

-- Обращения учеников к разным ролям
CREATE TABLE student_messages (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    target_id INTEGER,
    target_role TEXT,
    topic TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new',
    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (target_id) REFERENCES users(id)
);

-- Критерии оценки
CREATE TABLE rating_criteria (
    id INTEGER PRIMARY KEY,
    school_id INTEGER,
    target_role TEXT,
    key TEXT,
    display_name TEXT,
    position INTEGER,
    active BOOLEAN DEFAULT 1,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- AI-отчёты
CREATE TABLE ai_reports (
    id INTEGER PRIMARY KEY,
    target_type TEXT, -- 'student', 'teacher', 'class', 'group', 'school'
    target_id INTEGER,
    school_id INTEGER,
    report_type TEXT,
    date DATE,
    content TEXT,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);
