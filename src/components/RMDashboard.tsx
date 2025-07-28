import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, Mic, FileText, TrendingUp, Users, Target, Shield, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const RMDashboard = () => {
  const recentAnalysis = [
    { client: 'John Chen', sentiment: 'Positive', intent: 'Investment Inquiry', confidence: 92 },
    { client: 'Maria Wong', sentiment: 'Concerned', intent: 'Risk Assessment', confidence: 87 },
    { client: 'David Liu', sentiment: 'Neutral', intent: 'Portfolio Review', confidence: 94 }
  ];

  const recommendations = [
    'Suggest ESG investment options for environmentally conscious clients',
    'Recommend high-yield bonds for risk-averse portfolio',
    'Propose tech stock diversification for growth-oriented clients'
  ];

  const kycTasks = [
    { client: 'Sarah Thompson', status: 'pending', task: 'Income verification', priority: 'high' },
    { client: 'Robert Kim', status: 'completed', task: 'AML screening', priority: 'medium' },
    { client: 'Lisa Zhang', status: 'in-progress', task: 'Source of funds', priority: 'high' }
  ];

  const upcomingMeetings = [
    { client: 'John Chen', time: '10:00 AM', type: 'Portfolio Review', duration: '45 min' },
    { client: 'Maria Wong', time: '2:30 PM', type: 'Risk Assessment', duration: '30 min' },
    { client: 'David Liu', time: '4:00 PM', type: 'Investment Planning', duration: '60 min' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-rm mb-2">Relation Manager Dashboard</h2>
        <p className="text-muted-foreground">AI-Powered advisor tools and customer insights</p>
      </div>

      {/* AI Features Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-rm/30 bg-rm/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Brain className="w-4 h-4 text-rm" />
              Intent Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rm">94%</div>
            <div className="text-xs text-muted-foreground">Accuracy Rate</div>
          </CardContent>
        </Card>

        <Card className="border-rm/30 bg-rm/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rm" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rm">127</div>
            <div className="text-xs text-muted-foreground">This week</div>
          </CardContent>
        </Card>

        <Card className="border-rm/30 bg-rm/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Mic className="w-4 h-4 text-rm" />
              Transcriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rm">89</div>
            <div className="text-xs text-muted-foreground">Calls analyzed</div>
          </CardContent>
        </Card>

        <Card className="border-rm/30 bg-rm/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-rm" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rm">87%</div>
            <div className="text-xs text-muted-foreground">Client satisfaction</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analysis */}
      <Card className="border-rm/30 bg-rm/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-rm flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Customer Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnalysis.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{analysis.client}</div>
                  <Badge variant={
                    analysis.sentiment === 'Positive' ? 'default' : 
                    analysis.sentiment === 'Concerned' ? 'destructive' : 
                    'secondary'
                  }>
                    {analysis.sentiment}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{analysis.intent}</div>
                  <div className="text-xs text-muted-foreground">{analysis.confidence}% confidence</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RAG Recommendations */}
      <Card className="border-rm/30 bg-rm/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-rm flex items-center gap-2">
            <FileText className="w-5 h-5" />
            RAG-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 rounded-lg bg-rm/10 border border-rm/20">
                <div className="text-sm">{rec}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Briefing */}
      <Card className="border-rm/30 bg-rm/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-rm">Latest Client Briefings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-glass border border-glass-border">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">John Chen - Portfolio Discussion</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Client expressed interest in sustainable investing. Discussed ESG options and environmental impact considerations.
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-glass border border-glass-border">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Maria Wong - Risk Assessment</div>
              <div className="text-xs text-muted-foreground">5 hours ago</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Client concerned about market volatility. Recommend conservative approach with balanced portfolio allocation.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive AI Agents */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Compliance & KYC Agent */}
        <Card className="border-rm/30 bg-rm/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-rm flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compliance & KYC Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              AI-powered compliance monitoring and KYC automation for wealth management
            </div>
            
            <div className="space-y-3">
              {kycTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-sm">{task.client}</div>
                    <Badge variant={
                      task.status === 'completed' ? 'default' : 
                      task.status === 'pending' ? 'destructive' : 
                      'secondary'
                    }>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{task.task}</div>
                    <div className="text-xs text-muted-foreground capitalize">{task.priority} priority</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Input 
                placeholder="Ask compliance & KYC questions" 
                className="bg-glass border-rm/20"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-rm/30 text-rm hover:bg-rm/10">
                  Run KYC Check
                </Button>
                <Button variant="outline" size="sm" className="border-rm/30 text-rm hover:bg-rm/10">
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Scheduling Agent */}
        <Card className="border-scheduler/30 bg-scheduler/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-scheduler flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Task Scheduling Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              AI assistant for optimal meeting scheduling and time management
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-glass border border-glass-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-scheduler" />
                  <span className="font-medium text-sm">Today's Schedule</span>
                </div>
                <div className="space-y-2">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{meeting.time}</span> - {meeting.client}
                      </div>
                      <div className="text-muted-foreground">
                        {meeting.type} ({meeting.duration})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Input 
                placeholder="Schedule your task" 
                className="bg-glass border-scheduler/20"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-scheduler/30 text-scheduler hover:bg-scheduler/10">
                  <Calendar className="w-4 h-4 mr-1" />
                  Smart Schedule
                </Button>
                <Button variant="outline" size="sm" className="border-scheduler/30 text-scheduler hover:bg-scheduler/10">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Optimize Day
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};