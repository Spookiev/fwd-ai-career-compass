import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  StudentProfile, 
  UserRole, 
  WorkloadState, 
  CareerRoadmap, 
  FacultyReview, 
  CareerRecommendation,
  EvidenceDocument,
  TriangulatedSkillProfile,
  CareerPossibilityMap,
  CareerPresenceDocument,
  WellbeingDocument,
  AvatarIdentity,
  DailyMoodLog,
  DeconstructedReadiness
} from '../types';
import { 
  SAMPLE_STUDENTS, 
  INITIAL_WORKLOAD_STATE, 
  SAMPLE_FACULTY_REVIEWS,
  INITIAL_EVIDENCE,
  INITIAL_TRIANGULATED_PROFILE,
  INITIAL_POSSIBILITY_MAP,
  INITIAL_PRESENCE,
  INITIAL_WELLBEING,
  AVAILABLE_AVATARS,
  DECONSTRUCTED_KPIS
} from '../data/sampleProfiles';
import { INITIAL_ROADMAP, SAMPLE_CAREER_RECOMMENDATIONS } from '../data/careerExplorerData';
import { sound } from '../lib/sound';
import { triangulateEvidenceAndInterests, TriangulationInput } from '../lib/gemini';

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
  // FWD 2.0 States & Actions
  evidence: EvidenceDocument;
  updateEvidence: (updates: Partial<EvidenceDocument>) => void;
  triangulatedProfile: TriangulatedSkillProfile;
  possibilityMap: CareerPossibilityMap;
  presence: CareerPresenceDocument;
  togglePresenceCheck: (section: 'github' | 'linkedIn' | 'resumeAts' | 'portfolio', itemKey: string) => void;
  wellbeing: WellbeingDocument;
  logDailyMood: (log: Omit<DailyMoodLog, 'date'>) => void;
  toggleStreakFreeze: () => void;
  avatar: AvatarIdentity;
  updateAvatar: (avatar: AvatarIdentity) => void;
  deconstructedKPIs: DeconstructedReadiness;
  runTriangulation: (customInput?: TriangulationInput) => Promise<void>;
  completeMiniTrialDay: (roleId: string, dayNumber: number) => void;
  adoptPossibilityRoadmap: (roleId: string) => void;
  isTriangulating: boolean;
  switchDemoStudent: (index: number) => void;
  resetAllData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('fwd_user_role') as UserRole) || 'student';
  });

  const [, setStudentIndex] = useState<number>(0);

  const [student, setStudentState] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('fwd_student_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return SAMPLE_STUDENTS[0];
  });

  const [workload, setWorkloadState] = useState<WorkloadState>(() => {
    const saved = localStorage.getItem('fwd_workload_state');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_WORKLOAD_STATE;
  });

  const [roadmap, setRoadmapState] = useState<CareerRoadmap>(() => {
    const saved = localStorage.getItem('fwd_career_roadmap');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_ROADMAP;
  });

  const [savedCareers, setSavedCareers] = useState<string[]>(() => {
    const saved = localStorage.getItem('fwd_saved_careers');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return ['role-fullstack-ai', 'role-cloud-architect'];
  });

  const [facultyReviews, setFacultyReviews] = useState<FacultyReview[]>(() => {
    const saved = localStorage.getItem('fwd_faculty_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return SAMPLE_FACULTY_REVIEWS;
  });

  const [recommendations, setRecommendationsState] = useState<CareerRecommendation[]>(() => {
    const saved = localStorage.getItem('fwd_recommendations');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return SAMPLE_CAREER_RECOMMENDATIONS;
  });

  // FWD 2.0 States
  const [evidence, setEvidenceState] = useState<EvidenceDocument>(() => {
    const saved = localStorage.getItem('fwd_evidence_document');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_EVIDENCE;
  });

  const [triangulatedProfile, setTriangulatedProfileState] = useState<TriangulatedSkillProfile>(() => {
    const saved = localStorage.getItem('fwd_triangulated_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_TRIANGULATED_PROFILE;
  });

  const [possibilityMap, setPossibilityMapState] = useState<CareerPossibilityMap>(() => {
    const saved = localStorage.getItem('fwd_possibility_map');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_POSSIBILITY_MAP;
  });

  const [presence, setPresenceState] = useState<CareerPresenceDocument>(() => {
    const saved = localStorage.getItem('fwd_presence_document');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PRESENCE;
  });

  const [wellbeing, setWellbeingState] = useState<WellbeingDocument>(() => {
    const saved = localStorage.getItem('fwd_wellbeing_document');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_WELLBEING;
  });

  const [avatar, setAvatarState] = useState<AvatarIdentity>(() => {
    const saved = localStorage.getItem('fwd_avatar_identity');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return AVAILABLE_AVATARS[0];
  });

  const [deconstructedKPIs, setDeconstructedKPIs] = useState<DeconstructedReadiness>(() => {
    const saved = localStorage.getItem('fwd_deconstructed_kpis');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DECONSTRUCTED_KPIS;
  });

  const [isTriangulating, setIsTriangulating] = useState(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('fwd_user_role', role); }, [role]);
  useEffect(() => { localStorage.setItem('fwd_student_profile', JSON.stringify(student)); }, [student]);
  useEffect(() => { localStorage.setItem('fwd_workload_state', JSON.stringify(workload)); }, [workload]);
  useEffect(() => { localStorage.setItem('fwd_career_roadmap', JSON.stringify(roadmap)); }, [roadmap]);
  useEffect(() => { localStorage.setItem('fwd_saved_careers', JSON.stringify(savedCareers)); }, [savedCareers]);
  useEffect(() => { localStorage.setItem('fwd_faculty_reviews', JSON.stringify(facultyReviews)); }, [facultyReviews]);
  useEffect(() => { localStorage.setItem('fwd_recommendations', JSON.stringify(recommendations)); }, [recommendations]);
  useEffect(() => { localStorage.setItem('fwd_evidence_document', JSON.stringify(evidence)); }, [evidence]);
  useEffect(() => { localStorage.setItem('fwd_triangulated_profile', JSON.stringify(triangulatedProfile)); }, [triangulatedProfile]);
  useEffect(() => { localStorage.setItem('fwd_possibility_map', JSON.stringify(possibilityMap)); }, [possibilityMap]);
  useEffect(() => { localStorage.setItem('fwd_presence_document', JSON.stringify(presence)); }, [presence]);
  useEffect(() => { localStorage.setItem('fwd_wellbeing_document', JSON.stringify(wellbeing)); }, [wellbeing]);
  useEffect(() => { localStorage.setItem('fwd_avatar_identity', JSON.stringify(avatar)); }, [avatar]);
  useEffect(() => { localStorage.setItem('fwd_deconstructed_kpis', JSON.stringify(deconstructedKPIs)); }, [deconstructedKPIs]);

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

  const updateEvidence = (updates: Partial<EvidenceDocument>) => {
    setEvidenceState(prev => ({ ...prev, ...updates }));
    sound.playCheck();
  };

  const updateAvatar = (newAvatar: AvatarIdentity) => {
    setAvatarState(newAvatar);
    setStudentState(prev => ({ ...prev, avatarUrl: newAvatar.imageUrl }));
    sound.playLevelUp();
  };

  const togglePresenceCheck = (section: 'github' | 'linkedIn' | 'resumeAts' | 'portfolio', itemKey: string) => {
    sound.playCheck();
    setPresenceState(prev => {
      const nextBreakdown = { ...prev.breakdown };
      
      if (section === 'github') {
        const gh = nextBreakdown.github.checklist as Record<string, boolean>;
        gh[itemKey] = !gh[itemKey];
        const count = Object.values(gh).filter(Boolean).length;
        nextBreakdown.github.score = Math.round((count / 4) * 100);
      } else if (section === 'linkedIn') {
        const li = nextBreakdown.linkedIn.checklist as Record<string, boolean>;
        li[itemKey] = !li[itemKey];
        const count = Object.values(li).filter(Boolean).length;
        nextBreakdown.linkedIn.score = Math.round((count / 4) * 100);
      } else if (section === 'portfolio') {
        const pf = nextBreakdown.portfolio as unknown as Record<string, boolean>;
        pf[itemKey] = !pf[itemKey];
        const count = [nextBreakdown.portfolio.responsive, nextBreakdown.portfolio.caseStudies].filter(Boolean).length;
        nextBreakdown.portfolio.score = Math.round((count / 2) * 100);
      }

      const totalScore = Math.round(
        (nextBreakdown.github.score * 0.25) +
        (nextBreakdown.linkedIn.score * 0.25) +
        (nextBreakdown.resumeAts.score * 0.25) +
        (nextBreakdown.portfolio.score * 0.15) +
        (nextBreakdown.certifications.score * 0.10)
      );

      setDeconstructedKPIs(kpis => ({ ...kpis, careerPresence: totalScore }));

      return {
        ...prev,
        overallScore: totalScore,
        breakdown: nextBreakdown
      };
    });
  };

  const logDailyMood = (log: Omit<DailyMoodLog, 'date'>) => {
    sound.playLevelUp();
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: DailyMoodLog = { ...log, date: todayStr };

    setWellbeingState(prev => {
      const filtered = prev.dailyLogs.filter(l => l.date !== todayStr);
      const updatedLogs = [newLog, ...filtered].slice(0, 30);
      
      let newFatigue = prev.fatigueScore;
      let newRecommendation = prev.pacingRecommendation;
      let supportiveMsg = "Streak maintained with optimal cognitive health!";

      if (log.moodEmoji === '😫' || log.preEnergyLevel <= 2) {
        newFatigue = Math.min(100, prev.fatigueScore + 25);
        newRecommendation = 'Recovery Day';
        supportiveMsg = "You've exerted high effort. Today is designated for recharge with streak protection!";
      } else if (log.preEnergyLevel >= 4) {
        newFatigue = Math.max(10, prev.fatigueScore - 10);
        newRecommendation = 'Normal';
        supportiveMsg = "Energy is peaked! Excellent time for a 45-minute deep focus block.";
      }

      return {
        ...prev,
        dailyLogs: updatedLogs,
        fatigueScore: newFatigue,
        pacingRecommendation: newRecommendation,
        lastSupportiveMessage: supportiveMsg,
        currentStreak: prev.currentStreak + 1
      };
    });

    setDeconstructedKPIs(k => ({ ...k, learningConsistency: Math.min(99, k.learningConsistency + 2) }));
  };

  const toggleStreakFreeze = () => {
    sound.playThemeSwitch();
    setWellbeingState(prev => {
      if (prev.freezeTokensRemaining <= 0 && !prev.streakFrozen) return prev;
      return {
        ...prev,
        streakFrozen: !prev.streakFrozen,
        freezeTokensRemaining: prev.streakFrozen ? prev.freezeTokensRemaining : prev.freezeTokensRemaining - 1,
        pacingRecommendation: !prev.streakFrozen ? 'Recovery Day' : 'Normal',
        lastSupportiveMessage: !prev.streakFrozen 
          ? "Streak frozen for 24 hours. Enjoy your guilt-free recovery day!"
          : "Streak resumed. Welcome back!"
      };
    });
  };

  const completeMiniTrialDay = (roleId: string, dayNumber: number) => {
    sound.playCheck();
    setPossibilityMapState(prev => {
      const nextMatches = prev.matches.map(m => {
        if (m.roleId === roleId) {
          const nextTasks = m.miniTrial.tasks.map(t => {
            if (t.day === dayNumber) {
              return { ...t, completed: !t.completed };
            }
            return t;
          });
          return {
            ...m,
            miniTrial: { ...m.miniTrial, tasks: nextTasks }
          };
        }
        return m;
      });

      return { ...prev, matches: nextMatches };
    });

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  const runTriangulation = async (customInput?: TriangulationInput) => {
    setIsTriangulating(true);
    sound.playThemeSwitch();

    try {
      const input: TriangulationInput = customInput || {
        selfIntro: evidence.selfIntroduction?.rawText,
        interests: triangulatedProfile.interestVector,
        workStyle: triangulatedProfile.workStyle,
        resumeData: evidence.resume,
        githubData: evidence.github,
        codingData: {
          leetcodeUser: evidence.leetcode?.username,
          problemsSolved: evidence.leetcode?.problemsSolved,
          hackerrankBadges: evidence.hackerrank?.badges
        },
        academicData: evidence.academics
      };

      const result = await triangulateEvidenceAndInterests(input);

      if (result.triangulatedProfile) {
        setTriangulatedProfileState({
          userId: student.uid,
          skills: result.triangulatedProfile.skills,
          interestVector: result.triangulatedProfile.interestVector,
          workStyle: result.triangulatedProfile.workStyle
        });
      }

      if (result.careerMatches && result.careerMatches.length > 0) {
        setPossibilityMapState({
          userId: student.uid,
          updatedAt: new Date().toISOString(),
          matches: result.careerMatches
        });

        // Also update standard recommendation views
        const recs: CareerRecommendation[] = result.careerMatches.map((m, idx) => ({
          id: `rec-${idx + 1}`,
          roleTitle: m.title,
          matchScore: m.compatibilityScore,
          marketDemand: m.compatibilityScore > 90 ? 'Very High' : 'High',
          salaryRange: m.salaryRange || '₹18 - ₹35 LPA',
          growthRate: m.growthRate || '+30% YoY',
          whyFitRationale: m.whyItSuitsYou.join('. '),
          strengths: m.whyItSuitsYou.slice(0, 3),
          areasToDevelop: m.whatMayChallengeYou.slice(0, 2),
          priorityMissingSkills: m.skillGaps.map(g => g.skill),
          recommendedTimelineMonths: 6
        }));
        setRecommendationsState(recs);
      }

      // Update deconstructed KPIs
      setDeconstructedKPIs({
        careerFitIndex: 94,
        skillReadiness: 88,
        careerPresence: presence.overallScore,
        interviewReadiness: 82,
        learningConsistency: 90
      });

      sound.playLevelUp();
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#7C3AED', '#EC4899', '#10B981', '#38BDF8']
        });
      } catch {}
    } catch (err) {
      console.error('Triangulation execution error:', err);
    } finally {
      setIsTriangulating(false);
    }
  };

  const adoptPossibilityRoadmap = (roleId: string) => {
    sound.playLevelUp();
    const match = possibilityMap.matches.find(m => m.roleId === roleId || m.title === roleId);
    if (match) {
      setStudentState(s => ({ ...s, dreamRole: match.title }));
    }
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

      setStudentState(s => ({ ...s, readinessScore: calculatedReadiness }));
      setDeconstructedKPIs(k => ({ ...k, skillReadiness: calculatedReadiness }));

      return { ...prev, monthlyGoals: newMonthlyGoals };
    });

    if (newlyCompleted) {
      sound.playCheck();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#7C3AED', '#EC4899', '#10B981', '#F59E0B']
        });
      } catch {}

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
    setEvidenceState(INITIAL_EVIDENCE);
    setTriangulatedProfileState(INITIAL_TRIANGULATED_PROFILE);
    setPossibilityMapState(INITIAL_POSSIBILITY_MAP);
    setPresenceState(INITIAL_PRESENCE);
    setWellbeingState(INITIAL_WELLBEING);
    setAvatarState(AVAILABLE_AVATARS[0]);
    setDeconstructedKPIs(DECONSTRUCTED_KPIS);
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
        evidence,
        updateEvidence,
        triangulatedProfile,
        possibilityMap,
        presence,
        togglePresenceCheck,
        wellbeing,
        logDailyMood,
        toggleStreakFreeze,
        avatar,
        updateAvatar,
        deconstructedKPIs,
        runTriangulation,
        completeMiniTrialDay,
        adoptPossibilityRoadmap,
        isTriangulating,
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

