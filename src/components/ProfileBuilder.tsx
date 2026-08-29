import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Sparkles, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Check, 
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StudentProfile, Project, Internship } from '../types';
import { sound } from '../lib/sound';

interface ProfileBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ isOpen, onClose }) => {
  const { student, updateStudent } = useAuth();
  const [formData, setFormData] = useState<StudentProfile>({ ...student });
  const [newSkill, setNewSkill] = useState<string>('');
  const [newLanguage, setNewLanguage] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLevelUp();
    updateStudent(formData);
    onClose();
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    sound.playCheck();
    setFormData(prev => ({
      ...prev,
      skills: Array.from(new Set([...prev.skills, newSkill.trim()]))
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    sound.playClick();
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddLanguage = () => {
    if (!newLanguage.trim()) return;
    sound.playCheck();
    setFormData(prev => ({
      ...prev,
      programmingLanguages: Array.from(new Set([...prev.programmingLanguages, newLanguage.trim()]))
    }));
    setNewLanguage('');
  };

  const handleRemoveLanguage = (lang: string) => {
    sound.playClick();
    setFormData(prev => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.filter(l => l !== lang)
    }));
  };

  const handleAddProject = () => {
    sound.playClick();
    const newProj: Project = {
      id: `p_${Date.now()}`,
      title: 'New Innovation Project',
      description: 'Engineered high-performance module using modern frameworks.',
      technologies: ['TypeScript', 'FastAPI', 'Docker']
    };
    setFormData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const handleRemoveProject = (id: string) => {
    sound.playClick();
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-4xl bg-[#140E24] border border-purple-500/30 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white font-display">
                Athlete Profile & Academic Matrix Intake
              </h2>
              <p className="text-xs text-[#D4CDE6]/70">
                Update academic credentials, skills inventory, project records, and placement targets.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          
          {/* Section 1: Basic Identity & Academic Metadata */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Credentials</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Full Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">University / Institution</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Academic Major</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Cumulative CGPA (out of 10.0)</label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-bold focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Current Semester</label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Graduation Year</label>
                <input
                  type="text"
                  value={formData.gradYear}
                  onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Career Aspirations & Targets */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Career Aspirations & Target Placement</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Dream Target Role</label>
                <input
                  type="text"
                  value={formData.dreamRole}
                  onChange={(e) => setFormData({ ...formData, dreamRole: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Target Dream Companies</label>
                <input
                  type="text"
                  value={formData.dreamCompany}
                  onChange={(e) => setFormData({ ...formData, dreamCompany: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 font-semibold">Work Preference</label>
                <select
                  value={formData.workPreference}
                  onChange={(e) => setFormData({ ...formData, workPreference: e.target.value as 'Remote' | 'Hybrid' | 'On-site' })}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Skills & Programming Languages */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              <span>Skills & Programming Languages Inventory</span>
            </span>

            {/* Skills */}
            <div className="space-y-2">
              <label className="text-white/70 font-semibold">Technical Frameworks & Tools</label>
              <div className="flex flex-wrap gap-1.5">
                {formData.skills.map((s) => (
                  <span key={s} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-200">
                    <span>{s}</span>
                    <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Type new skill and click Add..."
                  className="flex-1 p-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Add Skill
                </button>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="space-y-2 pt-2">
              <label className="text-white/70 font-semibold">Core Programming Languages</label>
              <div className="flex flex-wrap gap-1.5">
                {formData.programmingLanguages.map((l) => (
                  <span key={l} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-200">
                    <span>{l}</span>
                    <button type="button" onClick={() => handleRemoveLanguage(l)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
                  placeholder="Type language (e.g. Golang, Rust, C++)..."
                  className="flex-1 p-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Add Language
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Projects List */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Projects Portfolio ({formData.projects.length})</span>
              </span>
              <button
                type="button"
                onClick={handleAddProject}
                className="px-3 py-1 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {formData.projects.map((p, idx) => (
                <div key={p.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="font-bold text-white bg-transparent border-b border-white/10 focus:border-purple-400 focus:outline-none w-3/4"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(p.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    value={p.description}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, projects: updated });
                    }}
                    rows={2}
                    className="w-full p-2 rounded-xl bg-black/40 text-[#D4CDE6] text-[11px] focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold shadow-glow hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Athlete Profile Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
