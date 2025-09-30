import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react";
import { ResultCard } from "@/components/ui/result-card";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const lastUpdated = "September 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-neural-pink rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-neural-blue rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-5 h-5 bg-neural-purple rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-primary-foreground" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Privacy Policy
              </h1>
            </div>
            
            <p className="text-lg text-primary-foreground/80">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <ResultCard variant="accent">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At MindMatch (operated by NeuraLove), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. We are committed to protecting your personal data and being transparent about our practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using MindMatch, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </ResultCard>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Information We Collect</h2>
              </div>

              <div className="space-y-6">
                <ResultCard variant="base">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information You Provide</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Account Information:</strong> Name, age, gender, email address when you create an account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Profile Information:</strong> Photos, bio, preferences, and other information you choose to share</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Quiz Responses:</strong> Your answers to our cognitive compatibility assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Communications:</strong> Messages, feedback, and correspondence with us or other users</span>
                    </li>
                  </ul>
                </ResultCard>

                <ResultCard variant="base">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Usage Data:</strong> How you interact with our platform, features used, time spent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Location Data:</strong> Approximate location based on IP address (with your permission)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Cookies:</strong> Small data files stored on your device to enhance your experience</span>
                    </li>
                  </ul>
                </ResultCard>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">How We Use Your Information</h2>
              </div>

              <ResultCard variant="primary">
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Provide Services:</strong> Create and maintain your account, analyze your cognitive profile, and match you with compatible individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Improve Experience:</strong> Personalize and optimize your user experience, develop new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Communication:</strong> Send you updates, notifications, and respond to your inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Safety & Security:</strong> Detect and prevent fraud, abuse, and other harmful activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Research:</strong> Conduct aggregate analysis to improve our matching algorithms (always anonymized)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Legal Compliance:</strong> Comply with legal obligations and enforce our terms</span>
                  </li>
                </ul>
              </ResultCard>
            </div>

            {/* Information Sharing */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">How We Share Your Information</h2>
              </div>

              <ResultCard variant="secondary">
                <p className="text-muted-foreground mb-4">
                  <strong>We do not sell your personal information.</strong> We may share your information only in the following circumstances:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>With Other Users:</strong> Your profile information and cognitive type with potential matches (you control what's visible)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Service Providers:</strong> Third-party companies that help us operate our platform (hosting, analytics, customer support)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you'll be notified)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>With Your Consent:</strong> Any other sharing with your explicit permission</span>
                  </li>
                </ul>
              </ResultCard>
            </div>

            {/* Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Data Security</h2>
              </div>

              <ResultCard variant="base">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">🔒</span>
                    <span>Encryption of data in transit and at rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">🔒</span>
                    <span>Regular security assessments and audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">🔒</span>
                    <span>Strict access controls and employee training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">🔒</span>
                    <span>Secure cloud infrastructure with industry-leading providers</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </ResultCard>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Your Privacy Rights</h2>
              </div>

              <ResultCard variant="superpower">
                <p className="text-muted-foreground mb-4">You have the following rights regarding your personal information:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Access:</strong> Request a copy of your personal data we hold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Correction:</strong> Update or correct inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Deletion:</strong> Request deletion of your account and associated data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Portability:</strong> Receive your data in a structured, machine-readable format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Objection:</strong> Object to certain processing of your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, please contact us at <a href="mailto:privacy@mindmatch.com" className="text-primary hover:underline">privacy@mindmatch.com</a>
                </p>
              </ResultCard>
            </div>

            {/* Children's Privacy */}
            <ResultCard variant="base">
              <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                MindMatch is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.
              </p>
            </ResultCard>

            {/* Data Retention */}
            <ResultCard variant="base">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we need to retain certain information for legal or legitimate business purposes (e.g., fraud prevention, legal compliance).
              </p>
            </ResultCard>

            {/* International Transfers */}
            <ResultCard variant="base">
              <h2 className="text-2xl font-bold text-foreground mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, such as standard contractual clauses, to protect your information.
              </p>
            </ResultCard>

            {/* Changes to Policy */}
            <ResultCard variant="base">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </ResultCard>

            {/* Contact Information */}
            <ResultCard variant="accent">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:privacy@mindmatch.com" className="text-primary hover:underline">privacy@mindmatch.com</a></p>
                <p><strong>Support:</strong> <a href="mailto:support@mindmatch.com" className="text-primary hover:underline">support@mindmatch.com</a></p>
                <p><strong>Address:</strong> MindMatch by NeuraLove, 123 Tech Street, San Francisco, CA 94102</p>
              </div>
            </ResultCard>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
