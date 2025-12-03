// Quick Browser Console Test for Supabase Functions
// Open http://localhost:8080, press F12, paste this in Console

// TEST 1: Check if create-profile function is deployed
console.log("🧪 Testing Supabase Functions...\n");

async function testSupabaseFunctions() {
    // Get Supabase client from window (if available)
    const SUPABASE_URL = "https://ofcktyrnwvlfiqnnhkoc.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mY2t0eXJud3ZsZmlxbm5oa29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDA2NDcsImV4cCI6MjA3NDM3NjY0N30.Xuz7ZPm4fXWBhXLzUx0sAQw3I9IsmfdOLsUzgID0Ph8";

    // Test 1: create-profile
    console.log("1️⃣ Testing create-profile function...");
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/create-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY
            },
            body: JSON.stringify({
                name: "Test User",
                age: 25,
                gender: "male"
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ create-profile: DEPLOYED & WORKING");
            console.log("   Response:", data);
        } else {
            console.log("❌ create-profile: DEPLOYED but FAILED");
            console.log("   Error:", data);
        }
    } catch (error) {
        console.log("❌ create-profile: NOT DEPLOYED or NETWORK ERROR");
        console.log("   Error:", error.message);
    }

    console.log("\n");

    // Test 2: analyze-cognitive-quiz
    console.log("2️⃣ Testing analyze-cognitive-quiz function...");
    try {
        const testAnswers = Array(24).fill(true).map((_, i) => i % 2 === 0);
        const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-cognitive-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY
            },
            body: JSON.stringify({
                answers: testAnswers,
                isForCouple: false
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ analyze-cognitive-quiz: DEPLOYED & WORKING");
            console.log("   Cognitive Type:", data.cognitiveType || data);
        } else {
            console.log("❌ analyze-cognitive-quiz: DEPLOYED but FAILED");
            console.log("   Error:", data);
        }
    } catch (error) {
        console.log("❌ analyze-cognitive-quiz: NOT DEPLOYED or NETWORK ERROR");
        console.log("   Error:", error.message);
    }

    console.log("\n");

    // Test 3: generate-cognitive-insights
    console.log("3️⃣ Testing generate-cognitive-insights function...");
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-cognitive-insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY
            },
            body: JSON.stringify({
                cognitiveType: "Analytical Thinker",
                quizAnswers: Array(24).fill(true).map((_, i) => i % 2 === 0)
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ generate-cognitive-insights: DEPLOYED & WORKING");
            console.log("   Insights:", data);
        } else {
            console.log("❌ generate-cognitive-insights: DEPLOYED but FAILED");
            console.log("   Error:", data);
        }
    } catch (error) {
        console.log("❌ generate-cognitive-insights: NOT DEPLOYED or NETWORK ERROR");
        console.log("   Error:", error.message);
    }

    console.log("\n");

    // Test 4: analyze-couple-compatibility
    console.log("4️⃣ Testing analyze-couple-compatibility function...");
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-couple-compatibility`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY
            },
            body: JSON.stringify({
                person1Type: "Analytical Thinker",
                person2Type: "Creative Innovator"
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ analyze-couple-compatibility: DEPLOYED & WORKING");
            console.log("   Compatibility:", data);
        } else {
            console.log("❌ analyze-couple-compatibility: DEPLOYED but FAILED");
            console.log("   Error:", data);
        }
    } catch (error) {
        console.log("❌ analyze-couple-compatibility: NOT DEPLOYED or NETWORK ERROR");
        console.log("   Error:", error.message);
    }

    console.log("\n📊 Test Complete!\n");
    console.log("Summary:");
    console.log("✅ = Function is deployed and working");
    console.log("❌ = Function needs deployment or has errors");
}

// Run the tests
testSupabaseFunctions();
