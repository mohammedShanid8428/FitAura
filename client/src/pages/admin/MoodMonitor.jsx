// AdminMoodPage.js
import React, { useState, useEffect } from 'react';
import { 
  fetchAllMoods, 
  updateMood, 
  updateMoodSection,
  createMood 
} from '../../services/allApis';

export default function AdminMoodPage() {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState('happy');
  const [currentMoodData, setCurrentMoodData] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sections = [
    { key: 'hero', label: 'Hero Section' },
    { key: 'enhance', label: 'Enhance Section' },
    { key: 'nutrition', label: 'Nutrition Section' },
    { key: 'routine', label: 'Routine Section' },
    { key: 'ourTips', label: 'Our Tips Section' },
    { key: 'dailyChallenge', label: 'Daily Challenge' },
    { key: 'affirmation', label: 'Affirmation' }
  ];

  useEffect(() => {
    loadMoods();
  }, []);

  useEffect(() => {
    if (moods.length > 0) {
      const mood = moods.find(m => m.moodType === selectedMood);
      setCurrentMoodData(mood);
    }
  }, [selectedMood, moods]);

  const loadMoods = async () => {
    try {
      setLoading(true);
      const response = await fetchAllMoods();
      if (response.success) {
        setMoods(response.data);
      }
    } catch (error) {
      console.error('Error loading moods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionUpdate = async (sectionKey, sectionData) => {
    try {
      setSaving(true);
      const response = await updateMoodSection(selectedMood, sectionKey, sectionData);
      
      if (response.success) {
        // Update local state
        setMoods(prevMoods => 
          prevMoods.map(mood => 
            mood.moodType === selectedMood 
              ? { ...mood, [sectionKey]: sectionData }
              : mood
          )
        );
        alert('Section updated successfully!');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Error updating section');
    } finally {
      setSaving(false);
    }
  };

  const renderHeroEditor = () => {
    const heroData = currentMoodData?.hero || {};
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Hero Section Editor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
            <select 
              value={heroData.color || 'yellow'} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                hero: { ...heroData, color: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            >
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background Image</label>
            <input 
              type="text" 
              value={heroData.backgroundImage || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                hero: { ...heroData, backgroundImage: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="images.modal20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GIF Path</label>
            <input 
              type="text" 
              value={heroData.gif || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                hero: { ...heroData, gif: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="emojisGif.emojis1"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input 
              type="text" 
              value={heroData.title || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                hero: { ...heroData, title: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
            <textarea 
              value={heroData.subtitle || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                hero: { ...heroData, subtitle: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              rows="3"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Action Buttons</label>
          {heroData.actions?.map((action, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={action.label || ''} 
                onChange={(e) => {
                  const newActions = [...(heroData.actions || [])];
                  newActions[index] = { ...action, label: e.target.value };
                  setCurrentMoodData({
                    ...currentMoodData,
                    hero: { ...heroData, actions: newActions }
                  });
                }}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md"
                placeholder="Button Label"
              />
              <input 
                type="text" 
                value={action.link || ''} 
                onChange={(e) => {
                  const newActions = [...(heroData.actions || [])];
                  newActions[index] = { ...action, link: e.target.value };
                  setCurrentMoodData({
                    ...currentMoodData,
                    hero: { ...heroData, actions: newActions }
                  });
                }}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md"
                placeholder="Button Link"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => handleSectionUpdate('hero', currentMoodData.hero)}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Hero Section'}
        </button>
      </div>
    );
  };

  const renderEnhanceEditor = () => {
    const enhanceData = currentMoodData?.enhance || {};
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Enhance Section Editor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Color Class</label>
            <input 
              type="text" 
              value={enhanceData.colorClass || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                enhance: { ...enhanceData, colorClass: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="text-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Emoji GIF</label>
            <input 
              type="text" 
              value={enhanceData.emojisGif || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                enhance: { ...enhanceData, emojisGif: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="emojisGif.emojis1"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Introduction Text</label>
            <textarea 
              value={enhanceData.intro || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                enhance: { ...enhanceData, intro: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              rows="3"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Services</label>
          {enhanceData.services?.map((service, index) => (
            <div key={index} className="border border-gray-600 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                  type="text" 
                  value={service.title || ''} 
                  onChange={(e) => {
                    const newServices = [...(enhanceData.services || [])];
                    newServices[index] = { ...service, title: e.target.value };
                    setCurrentMoodData({
                      ...currentMoodData,
                      enhance: { ...enhanceData, services: newServices }
                    });
                  }}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md"
                  placeholder="Service Title"
                />
                <input 
                  type="text" 
                  value={service.image || ''} 
                  onChange={(e) => {
                    const newServices = [...(enhanceData.services || [])];
                    newServices[index] = { ...service, image: e.target.value };
                    setCurrentMoodData({
                      ...currentMoodData,
                      enhance: { ...enhanceData, services: newServices }
                    });
                  }}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md"
                  placeholder="Image Path"
                />
              </div>
              <textarea 
                value={service.description || ''} 
                onChange={(e) => {
                  const newServices = [...(enhanceData.services || [])];
                  newServices[index] = { ...service, description: e.target.value };
                  setCurrentMoodData({
                    ...currentMoodData,
                    enhance: { ...enhanceData, services: newServices }
                  });
                }}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mt-2"
                rows="2"
                placeholder="Service Description"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => handleSectionUpdate('enhance', currentMoodData.enhance)}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Enhance Section'}
        </button>
      </div>
    );
  };

  const renderNutritionEditor = () => {
    const nutritionData = currentMoodData?.nutrition || {};
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Nutrition Section Editor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title Color</label>
            <input 
              type="text" 
              value={nutritionData.titleColor || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, titleColor: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="text-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Border Color</label>
            <input 
              type="text" 
              value={nutritionData.borderColor || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, borderColor: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="border-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Button Background</label>
            <input 
              type="text" 
              value={nutritionData.buttonBg || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, buttonBg: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="bg-yellow-400 hover:bg-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Badge Background</label>
            <input 
              type="text" 
              value={nutritionData.badgeBg || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, badgeBg: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="bg-yellow-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Badge Text</label>
            <input 
              type="text" 
              value={nutritionData.badgeText || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, badgeText: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="text-yellow-700"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input 
              type="text" 
              value={nutritionData.title || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, title: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
            <textarea 
              value={nutritionData.subtitle || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                nutrition: { ...nutritionData, subtitle: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              rows="3"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
          {nutritionData.features?.map((feature, index) => (
            <div key={index} className="border border-gray-600 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input 
                  type="text" 
                  value={feature.icon || ''} 
                  onChange={(e) => {
                    const newFeatures = [...(nutritionData.features || [])];
                    newFeatures[index] = { ...feature, icon: e.target.value };
                    setCurrentMoodData({
                      ...currentMoodData,
                      nutrition: { ...nutritionData, features: newFeatures }
                    });
                  }}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md"
                  placeholder="Icon Name (Leaf, Droplet, Cake)"
                />
                <input 
                  type="text" 
                  value={feature.title || ''} 
                  onChange={(e) => {
                    const newFeatures = [...(nutritionData.features || [])];
                    newFeatures[index] = { ...feature, title: e.target.value };
                    setCurrentMoodData({
                      ...currentMoodData,
                      nutrition: { ...nutritionData, features: newFeatures }
                    });
                  }}
                  className="px-3 py-2 bg-gray-700 text-white rounded-md"
                  placeholder="Feature Title"
                />
              </div>
              <textarea 
                value={feature.description || ''} 
                onChange={(e) => {
                  const newFeatures = [...(nutritionData.features || [])];
                  newFeatures[index] = { ...feature, description: e.target.value };
                  setCurrentMoodData({
                    ...currentMoodData,
                    nutrition: { ...nutritionData, features: newFeatures }
                  });
                }}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mt-2"
                rows="2"
                placeholder="Feature Description"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => handleSectionUpdate('nutrition', currentMoodData.nutrition)}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Nutrition Section'}
        </button>
      </div>
    );
  };

  const renderDailyChallengeEditor = () => {
    const challengeData = currentMoodData?.dailyChallenge || {};
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Daily Challenge Editor</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
          <input 
            type="text" 
            value={challengeData.color || ''} 
            onChange={(e) => setCurrentMoodData({
              ...currentMoodData,
              dailyChallenge: { ...challengeData, color: e.target.value }
            })}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            placeholder="yellow-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Challenges</label>
          {challengeData.challenges?.map((challenge, index) => (
            <div key={index} className="mb-2">
              <textarea 
                value={challenge || ''} 
                onChange={(e) => {
                  const newChallenges = [...(challengeData.challenges || [])];
                  newChallenges[index] = e.target.value;
                  setCurrentMoodData({
                    ...currentMoodData,
                    dailyChallenge: { ...challengeData, challenges: newChallenges }
                  });
                }}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                rows="2"
                placeholder="Challenge text"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => handleSectionUpdate('dailyChallenge', currentMoodData.dailyChallenge)}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Daily Challenge'}
        </button>
      </div>
    );
  };

  const renderAffirmationEditor = () => {
    const affirmationData = currentMoodData?.affirmation || {};
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Affirmation Editor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
            <input 
              type="text" 
              value={affirmationData.color || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                affirmation: { ...affirmationData, color: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Border Color</label>
            <input 
              type="text" 
              value={affirmationData.borderColor || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                affirmation: { ...affirmationData, borderColor: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Emoji</label>
            <input 
              type="text" 
              value={affirmationData.emoji || ''} 
              onChange={(e) => setCurrentMoodData({
                ...currentMoodData,
                affirmation: { ...affirmationData, emoji: e.target.value }
              })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              placeholder="😊"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Affirmation Text</label>
          <textarea 
            value={affirmationData.affirmation || ''} 
            onChange={(e) => setCurrentMoodData({
              ...currentMoodData,
              affirmation: { ...affirmationData, affirmation: e.target.value }
            })}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            rows="3"
          />
        </div>
        
        <button 
          onClick={() => handleSectionUpdate('affirmation', currentMoodData.affirmation)}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Affirmation'}
        </button>
      </div>
    );
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroEditor();
      case 'enhance':
        return renderEnhanceEditor();
      case 'nutrition':
        return renderNutritionEditor();
      case 'dailyChallenge':
        return renderDailyChallengeEditor();
      case 'affirmation':
        return renderAffirmationEditor();
      default:
        return <div className="text-white">Select a section to edit</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading mood data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Mood Management</h1>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Mood</label>
          <select 
            value={selectedMood} 
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full text-left px-4 py-2 rounded-md transition ${
                    activeSection === section.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Section Editor */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 p-6 rounded-lg">
              {currentMoodData ? renderSectionEditor() : (
                <div className="text-white">No mood data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}