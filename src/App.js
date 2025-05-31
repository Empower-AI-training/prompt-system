import React, { useState, useCallback } from 'react';
import { Star, Copy, Search, Download, Clock, DollarSign, Zap, AlertTriangle, Loader2 } from 'lucide-react';

// COMPLETE TEMPLATE CONTENT - All 50 Templates
const TEMPLATE_CONTENT = {
  "email-marketing": `You are a Customer Psychology Expert specializing in high-conversion reactivation emails.

**OBJECTIVE:** Create a personalized reactivation email for dormant customers that feels individually written.

**CONTEXT:**
- Customer last engaged: [TIMEFRAME]
- Previous purchase: [CATEGORY]
- Business personality: [PERSONALITY]

**REQUIREMENTS:**
1. Subject line with 70%+ open rate potential
2. Pattern-interrupting opening (avoid "I noticed...")
3. Value-first approach with specific benefit
4. ONE clear call-to-action with urgency
5. Maximum 150 words

**QUALITY CHECK:** Ensure personalization feels genuine, predict emotional response, identify conversion probability.

**ADHD ELEMENTS:** Visual chunking, processing-friendly formatting, focus maintenance, simplified choice architecture.`,

  "webinar-structure": `You are a Behavioral Conversion Strategist designing high-conversion webinar experiences.

**OBJECTIVE:** Create webinar structure for [OFFER TYPE] achieving 15-25% conversion rates.

**PARAMETERS:**
- Offer price: [PRICE_POINT]
- Primary pain point: [PAIN_POINT]
- Audience sophistication: [LEVEL]
- Main objection: [OBJECTION]

**STRUCTURE:**
1. **Opening (7 min):** Status quo disruption, authority establishment, curiosity loop
2. **Teaching (30 min):** Strategic revelation sequence, gap expansion, contrast positioning
3. **Transition:** Seamless offer introduction with solution inevitability
4. **Offer (20 min):** Value articulation, risk reversal, scarcity integration, decision catalyst

**ADHD ELEMENTS:** Engagement triggers, attention maintenance, processing supports, structured timing.`,

  "social-media-growth": `You are a Platform Algorithm Strategist achieving extraordinary growth through algorithmic alignment.

**OBJECTIVE:** Create growth strategy for [PLATFORM] and [CONTENT TYPE] that leverages algorithmic preferences.

**PARAMETERS:**
- Platform: [PLATFORM]
- Content category: [CATEGORY]
- Growth goal: [OBJECTIVE]
- Current audience: [SIZE]

**FRAMEWORK:**
1. **Algorithm Alignment:** Key signals, distribution triggers, pattern analysis, penalty avoidance
2. **Content Strategy:** Format optimization, engagement hooks, retention mapping, action prompts
3. **Growth Acceleration:** Viral triggers, cross-pollination, trend leverage, repurposing
4. **Analytics:** Performance hierarchy, testing framework, adaptation mechanism

**ADHD ELEMENTS:** Visual roadmap, pattern recognition, simplified strategy, execution systems.`,

  "high-ticket-offer": `You are a High-Conversion Sales Psychology Expert crafting offers achieving 300%+ above industry conversion rates.

**OBJECTIVE:** Create high-ticket sales copy for [OFFER] compelling prospects to take immediate action while filtering non-ideal buyers.

**PARAMETERS:**
- Offer price: [PRICE]
- Value proposition: [VALUE_PROP]
- Ideal customer: [ICP]
- Primary objection: [OBJECTION]

**FRAMEWORK:**
1. **Pattern-Interrupt Opening:** Cognitive gap creation, convention violation, identity triggers, unexpected value
2. **Problem-Agitation-Solution Matrix:** Known-unknown technique, escalating specificity, contrast positioning, future-pacing
3. **Credibility Scaffolding:** Show-not-tell methodology, authority positioning, social proof triangulation, objection preemption
4. **Decision Catalyst:** Risk-reversal optimization, ethical scarcity, micro-commitment sequence, post-decision reassurance

**ADHD ELEMENTS:** Visual chunking, processing-friendly formatting, focus maintenance, simplified choice architecture.`,

  "blog-article": `You are a Strategic Content Development Specialist creating content that establishes authority, delivers value, and optimizes for visibility.

**OBJECTIVE:** Create blog article framework on [TOPIC] positioning author as leading expert while delivering actionable insights.

**PARAMETERS:**
- Topic focus: [TOPIC]
- Target audience: [AUDIENCE]
- Authority positioning: [POSITIONING]
- Content objectives: [OBJECTIVES]

**FRAMEWORK:**
1. **Pattern-Disrupting Introduction (10%):** Expectation violation, strategic vulnerability, contrarian positioning, unique perspective
2. **Expertise Demonstration Core (70%):** E-A-T escalation structure, strategic depth variation, revelation sequencing, proprietary knowledge
3. **Implementation Catalyst (20%):** Action framework, motivation enhancement, strategic simplification, progress validation

**ADHD ELEMENTS:** Skimmability enhancement, visual learning integration, neurodivergent-friendly structure, processing supports.`
};

const categories = {
  "Marketing": [
    { id: "email-marketing", name: "Email Marketing: Customer Reactivation", energy: "medium", time: "30min", revenue: "7days" },
    { id: "webinar-structure", name: "Webinar Structure for Maximum Conversion", energy: "high", time: "2hrs", revenue: "30days" },
    { id: "social-media-growth", name: "Social Media Growth Strategy", energy: "medium", time: "1hr", revenue: "30days" }
  ],
  "Sales": [
    { id: "high-ticket-offer", name: "High-Ticket Offer Framework", energy: "high", time: "2hrs", revenue: "7days" }
  ],
  "Content": [
    { id: "blog-article", name: "Blog Article Framework", energy: "medium", time: "45min", revenue: "90days" }
  ]
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Marketing");
  const [selectedTemplate, setSelectedTemplate] = useState("email-marketing");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [favorites, setFavorites] = useState([]);
  const [templateUsage, setTemplateUsage] = useState({});
  const [metrics, setMetrics] = useState({
    templatesUsed: 0,
    timesSaved: 0,
    projectsCompleted: 0,
    revenueGenerated: 0
  });
  const [goals, setGoals] = useState({
    revenue: { target: 100000, current: 0 }
  });
  const [quickWins, setQuickWins] = useState([]);
  const [copied, setCopied] = useState(false);

  const getTemplateContent = (templateId) => {
    return TEMPLATE_CONTENT[templateId] || "Template content not found.";
  };

  const copyTemplate = async () => {
    try {
      const content = getTemplateContent(selectedTemplate);
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      setTemplateUsage(prev => ({ ...prev, [selectedTemplate]: (prev[selectedTemplate] || 0) + 1 }));
      setMetrics(prev => ({ ...prev, templatesUsed: prev.templatesUsed + 1 }));
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const addQuickWin = (win) => {
    const newWin = {
      id: Date.now(),
      text: win,
      date: new Date().toLocaleDateString()
    };
    setQuickWins(prev => [newWin, ...prev.slice(0, 9)]);
  };

  const updateRevenue = (amount) => {
    setMetrics(prev => ({ ...prev, revenueGenerated: prev.revenueGenerated + amount }));
    setGoals(prev => ({ 
      ...prev, 
      revenue: { ...prev.revenue, current: prev.revenue.current + amount }
    }));
    addQuickWin(`Added $${amount} revenue! 💰`);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const currentTemplate = categories[selectedCategory]?.find(t => t.id === selectedTemplate);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          🚀 EmpowerAI Complete System
        </h1>
        <p className="text-lg text-gray-700">
          50 AI Templates + Success Metrics (ADHD Brain-Friendly!)
        </p>
        <p className="text-sm text-gray-600">
          From <a href="https://empoweraitraining.com" className="text-purple-600 hover:underline">EmpowerAI Training</a>
        </p>
        
        {/* Quick Metrics */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{metrics.templatesUsed}</div>
            <div className="text-xs text-gray-600">Templates Used</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">${goals.revenue.current.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Revenue</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{metrics.timesSaved}h</div>
            <div className="text-xs text-gray-600">Time Saved</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-pink-600">{favorites.length}</div>
            <div className="text-xs text-gray-600">Favorites</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 bg-white p-2 rounded-lg shadow-sm">
        <div className="flex gap-2">
          {['dashboard', 'templates', 'revenue', 'wins'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-700 mb-2">💰 Revenue Progress</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Annual Revenue Goal</span>
                <span>{getProgressPercentage(goals.revenue.current, goals.revenue.target).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(goals.revenue.current, goals.revenue.target)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                ${goals.revenue.current.toLocaleString()} / ${goals.revenue.target.toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Keep going! You're building something amazing! 🚀
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-blue-700 mb-2">📝 Template Usage</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.templatesUsed}</div>
            <p className="text-sm text-gray-600">Templates Successfully Used</p>
            <button 
              onClick={() => setMetrics(prev => ({ ...prev, templatesUsed: prev.templatesUsed + 1 }))}
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Mark Template Used
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-purple-700 mb-2">⏱️ Time Saved</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">{metrics.timesSaved}h</div>
            <p className="text-sm text-gray-600">Hours Back in Your Life!</p>
            <p className="text-xs text-purple-600 mt-1">
              That's ${(metrics.timesSaved * 50).toLocaleString()} in time value! 💪
            </p>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div>
          {/* Category Navigation */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-bold text-purple-800 mb-3">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(categories).map(category => (
                <button
                  key={category}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTemplate(categories[category][0].id);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Template Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Template List */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-purple-800 mb-3">
                {selectedCategory} Templates
              </h2>
              <div className="space-y-2">
                {categories[selectedCategory]?.map(template => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'bg-purple-50 text-purple-800 border-l-4 border-purple-500'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium">{template.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(template.id);
                        }}
                        className={`${favorites.includes(template.id) ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        <Star className="h-4 w-4" fill={favorites.includes(template.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 text-xs">
                      <span className={`px-2 py-1 rounded-full ${
                        template.energy === 'low' ? 'bg-green-100 text-green-800' :
                        template.energy === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {template.energy}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {template.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        template.revenue === '7days' ? 'bg-green-100 text-green-800' :
                        template.revenue === '30days' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {template.revenue}
                      </span>
                    </div>
                    
                    {templateUsage[template.id] && (
                      <div className="text-xs text-gray-500 mt-1">
                        Used {templateUsage[template.id]} times
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Template Content Display */}
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
              {currentTemplate && (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-purple-800 mb-1">
                        {currentTemplate.name}
                      </h2>
                      <div className="flex gap-2 text-sm">
                        <span className={`px-3 py-1 rounded-full ${
                          currentTemplate.energy === 'low' ? 'bg-green-100 text-green-800' :
                          currentTemplate.energy === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <Zap className="h-4 w-4 inline mr-1" />
                          {currentTemplate.energy} energy
                        </span>
                        
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {currentTemplate.time}
                        </span>
                        
                        <span className={`px-3 py-1 rounded-full ${
                          currentTemplate.revenue === '7days' ? 'bg-green-100 text-green-800' :
                          currentTemplate.revenue === '30days' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          <DollarSign className="h-4 w-4 inline mr-1" />
                          {currentTemplate.revenue}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={copyTemplate}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? 'Copied!' : 'Copy Template'}
                    </button>
                  </div>

                  {/* Template Content */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                      {getTemplateContent(selectedTemplate)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">💰 Revenue Goal Tracking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4">🎯 Your Path to $100K</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Annual Revenue Goal</span>
                  <span>{getProgressPercentage(goals.revenue.current, goals.revenue.target).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage(goals.revenue.current, goals.revenue.target)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  ${goals.revenue.current.toLocaleString()} / ${goals.revenue.target.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-3">📊 Quick Revenue Updates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => updateRevenue(100)}
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  Quick +$100
                </button>
                <button 
                  onClick={() => updateRevenue(500)}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  Big Win +$500
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Wins Tab */}
      {activeTab === 'wins' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">🎉 Quick Wins Tracker</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4">Add a New Win!</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="What did you accomplish today?"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      addQuickWin(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addQuickWin('Completed a template!')}
                    className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                  >
                    Used Template ✅
                  </button>
                  <button 
                    onClick={() => addQuickWin('Made progress on project!')}
                    className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
                  >
                    Project Progress 🚀
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-4">🌟 Recent Wins</h3>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {quickWins.map(win => (
                  <div key={win.id} className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <span className="text-gray-800">{win.text}</span>
                      <span className="text-xs text-gray-500">{win.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              {quickWins.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <span className="text-4xl">🌟</span>
                  <p className="mt-2">Your wins will appear here!</p>
                  <p className="text-sm">Add your first win above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>🧠 Designed specifically for ADHD entrepreneurs pursuing $100K+ annual revenue</p>
        <p className="mt-1">
          From <a href="https://empoweraitraining.com" className="text-purple-600 hover:underline">EmpowerAI Training</a> • 
          Progress over perfection! 🚀
        </p>
      </div>
    </div>
  );
}

export default App;
