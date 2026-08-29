import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  StudentProfile, 
  UserRole, 
  WorkloadState, 
  CareerRoadmap, 
  FacultyReview, 
  CareerRecommendation 
} from '../types';
import { SAMPLE_STUDENTS, INITIAL_WORKLOAD_STATE, SAMPLE_FACULTY_REVIEWS } from '../data/sampleProfiles';
import { INITIAL_ROADMAP, SAMPLE_CAREER_RECOMMENDATIONS } from '../data/careerExplorerData';
import { sound } from '../lib/sound';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  student: StudentProfile;
  updateStudent: (updates: Partial<StudentProfile>) => void;
  workload: WorkloadState;
  updateWorkload: (updates: Partial<WorkloadState>) => void;
  roadmap: CareerRoadmap;
  toggleTaskCompletion: (taskId: string) => void;
  savedCareers: string[];
  toggleSaveCareer: (careerId: string) => void;
  facultyReviews: FacultyReview[];
  addFacultyReview: (review: Omit<FacultyReview, 'id' | 'date'>) => void;
  recommendations: CareerRecommendation[];
  setRecommendations: (recs: CareerRecommendation[]) => void;
  switchDemoStudent: (index: number) => void;
  resetAllData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('fwd_user_role') as UserRole) || 'student';
  });

  const [studentIndex, setStudentIndex] = useState<number>(0);

  const [student, setStudentState] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('fwd_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return SAMPLE_STUDENTS[0];
  });

  const [workload, setWorkloadState] = useState<WorkloadState>(() => {
    const saved = localStorage.getItem('fwd_workload_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_WORKLOAD_STATE;
  });

  const [roadmap, setRoadmapState] = useState<CareerRoadmap>(() => {
    const saved = localStorage.getItem('fwd_career_roadmap');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_ROADMAP;
  });

  const [savedCareers, setSavedCareers] = useState<string[]>(() => {
    const saved = localStorage.getItem('fwd_saved_careers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return ['role-fullstack-ai', 'role-cloud-architect'];
  });

  const [facultyReviews, setFacultyReviews] = useState<FacultyReview[]>(() => {
    const saved = localStorage.getItem('fwd_faculty_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return SAMPLE_FACULTY_REVIEWS;
  });

  const [recommendations, setRecommendationsState] = useState<CareerRecommendation[]>(() => {
    const saved = localStorage.getItem('fwd_recommendations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return SAMPLE_CAREER_RECOMMENDATIONS;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('fwd_user_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('fwd_student_profile', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('fwd_workload_state', JSON.stringify(workload));
  }, [workload]);

  useEffect(() => {
    localStorage.setItem('fwd_career_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('fwd_saved_careers', JSON.stringify(savedCareers));
  }, [savedCareers]);

  useEffect(() => {
    localStorage.setItem('fwd_faculty_reviews', JSON.stringify(facultyReviews));
  }, [facultyReviews]);

  useEffect(() => {
    localStorage.setItem('fwd_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    sound.playClick();
  };

  const updateStudent = (updates: Partial<StudentProfile>) => {
    setStudentState(prev => ({ ...prev, ...updates }));
  };

  const updateWorkload = (updates: Partial<WorkloadState>) => {
    setWorkloadState(prev => ({ ...prev, ...updates }));
  };

  const setRecommendations = (recs: CareerRecommendation[]) => {
    setRecommendationsState(recs);
  };

  const toggleTaskCompletion = (taskId: string) => {
    let newlyCompleted = false;

    setRoadmapState(prev => {
      let totalTasks = 0;
      let completedTasks = 0;

      const newMonthlyGoals = prev.monthlyGoals.map(month => {
        const newWeeklyGoals = month.weeklyGoals.map(week => {
          const newTasks = week.tasks.map(task => {
            if (task.id === taskId) {
              newlyCompleted = !task.completed;
              return { ...task, completed: newlyCompleted };
            }
            return task;
          });
          return { ...week, tasks: newTasks };
        });

        const allWeekTasksCompleted = newWeeklyGoals.every(w => w.tasks.every(t => t.completed));
        return {
          ...month,
          weeklyGoals: newWeeklyGoals,
          completed: allWeekTasksCompleted
        };
      });

      // Count totals for progress calculation
      newMonthlyGoals.forEach(m => {
        m.weeklyGoals.forEach(w => {
          w.tasks.forEach(t => {
            totalTasks++;
            if (t.completed) completedTasks++;
          });
        });
      });

      const completionRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
      const calculatedReadiness = Math.min(98, Math.round(65 + completionRatio * 30));

      // Update student readiness score dynamically
      setStudentState(s => ({
        ...s,
        readinessScore: calculatedReadiness
      }));

      return {
        ...prev,
        monthlyGoals: newMonthlyGoals
      };
    });

    if (newlyCompleted) {
      sound.playCheck();
      // Confetti burst for positive reinforcement
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#7C3AED', '#EC4899', '#10B981', '#F59E0B']
        });
      } catch {
        // fallback
      }

      setWorkloadState(w => ({
        ...w,
        tasksCompletedToday: w.tasksCompletedToday + 1,
        fatigueScore: Math.min(100, Math.max(0, w.fatigueScore + 2))
      }));
    } else {
      sound.playClick();
      setWorkloadState(w => ({
        ...w,
        tasksCompletedToday: Math.max(0, w.tasksCompletedToday - 1)
      }));
    }
  };

  const toggleSaveCareer = (careerId: string) => {
    sound.playClick();
    setSavedCareers(prev => {
      if (prev.includes(careerId)) {
        return prev.filter(id => id !== careerId);
      } else {
        return [...prev, careerId];
      }
    });
  };

  const addFacultyReview = (review: Omit<FacultyReview, 'id' | 'date'>) => {
    sound.playLevelUp();
    const newReview: FacultyReview = {
      ...review,
      id: `rev_${Date.now()}`,
      date: 'Just now',
    };
    setFacultyReviews(prev => [newReview, ...prev]);
  };

  const switchDemoStudent = (index: number) => {
    const target = SAMPLE_STUDENTS[index] || SAMPLE_STUDENTS[0];
    setStudentIndex(index);
    setStudentState(target);
    sound.playThemeSwitch();
  };

  const resetAllData = () => {
    localStorage.clear();
    setStudentState(SAMPLE_STUDENTS[0]);
    setWorkloadState(INITIAL_WORKLOAD_STATE);
    setRoadmapState(INITIAL_ROADMAP);
    setSavedCareers(['role-fullstack-ai', 'role-cloud-architect']);
    setFacultyReviews(SAMPLE_FACULTY_REVIEWS);
    setRecommendationsState(SAMPLE_CAREER_RECOMMENDATIONS);
    sound.playLevelUp();
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        student,
        updateStudent,
        workload,
        updateWorkload,
        roadmap,
        toggleTaskCompletion,
        savedCareers,
        toggleSaveCareer,
        facultyReviews,
        addFacultyReview,
        recommendations,
        setRecommendations,
        switchDemoStudent,
        resetAllData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
