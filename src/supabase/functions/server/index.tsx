import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// CORS must be first
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://findtheothers.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// The pre-defined KV table name in Supabase
const TABLE_NAME = 'kv_store_34132228';

// Initialize Supabase Client with Service Role (for DB operations)
const getAdminClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Storage Constants
const BUCKET_NAME = 'make-34132228-media';

// Ensure bucket exists on startup
(async () => {
    try {
        const supabase = getAdminClient();
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
        if (!bucketExists) {
            console.log(`Creating bucket ${BUCKET_NAME}...`);
            await supabase.storage.createBucket(BUCKET_NAME, { public: true });
            console.log(`Bucket ${BUCKET_NAME} created successfully`);
        } else {
            console.log(`Bucket ${BUCKET_NAME} already exists`);
        }
    } catch (err) {
        console.error("Bucket initialization error:", err);
    }
})();

// Middleware to verify user token via Supabase Auth
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    console.error("No Authorization header provided");
    return c.json({ error: 'Unauthorized: No token provided' }, 401);
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error("No token in Authorization header");
    return c.json({ error: 'Unauthorized: Invalid header format' }, 401);
  }
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    console.error("Auth verification failed:", error);
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }
  
  c.set('user', user);
  await next();
};

// --- KV Helper functions ---
const getKV = async (key: string) => {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .eq('key', key)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 is 'Row not found'
    console.error('KV Get Error:', error);
    throw error;
  }
  return data?.value || null;
};

const setKV = async (key: string, value: any) => {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({ key, value });
    
  if (error) {
    console.error('KV Set Error:', error);
    throw error;
  }
};

// --- Routes ---

// Health check - VERY FIRST ROUTE FOR TESTING
app.get('/make-server-34132228/health', (c) => {
  console.log("Health check called");
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'FTO Community Platform API is running'
  });
});

// Root route for debugging
app.get('/', (c) => {
  console.log("Root route called");
  return c.json({ 
    message: 'FTO Community Platform API',
    endpoints: [
      'GET /make-server-34132228/health',
      'GET /make-server-34132228/content/:type',
      'POST /make-server-34132228/content/:type',
      'POST /make-server-34132228/signup',
      'POST /make-server-34132228/upload'
    ]
  });
});

// Create Admin User (Protected or One-time)
app.post('/make-server-34132228/signup', async (c) => {
  console.log("Signup endpoint called");
  try {
    const body = await c.req.json();
    const { email, password } = body;
    
    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }
    
    const supabase = getAdminClient();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });
    
    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }
    
    console.log("User created successfully:", email);
    return c.json({ user: data.user, message: "User created successfully" });
  } catch (e: any) {
    console.error("Signup exception:", e);
    return c.json({ error: e.message || 'Signup failed' }, 500);
  }
});

// GET Content (Public) - For the frontend to fetch data
app.get('/make-server-34132228/content/:type', async (c) => {
  const type = c.req.param('type');
  console.log(`GET content/${type} called`);
  
  try {
    const data = await getKV(`content:${type}`);
    console.log(`Retrieved content:${type}`, data ? 'found' : 'not found (returning empty array)');
    
    // If no data exists yet, return empty array
    const result = data || [];
    return c.json(result);
  } catch (e: any) {
    console.error(`Error fetching content ${type}:`, e);
    return c.json({ error: 'Error fetching content', details: e.message }, 500);
  }
});

// POST Content (Protected) - For the CMS to save data
app.post('/make-server-34132228/content/:type', authMiddleware, async (c) => {
  const type = c.req.param('type');
  console.log(`POST content/${type} called`);
  
  try {
    const body = await c.req.json();
    console.log(`Saving content:${type} with ${Array.isArray(body) ? body.length : 0} items`);
    
    await setKV(`content:${type}`, body);
    console.log(`Content:${type} saved successfully`);
    
    return c.json({ success: true, message: "Content saved" });
  } catch (e: any) {
    console.error(`Error saving content ${type}:`, e);
    return c.json({ error: 'Error saving content', details: e.message }, 500);
  }
});

// Upload File (Protected)
app.post('/make-server-34132228/upload', authMiddleware, async (c) => {
  console.log("Upload endpoint called");
  
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || !(file instanceof File)) {
      console.error("No file in upload request");
      return c.json({ error: 'No file uploaded' }, 400);
    }

    console.log(`Uploading file: ${file.name}, type: ${file.type}, size: ${file.size}`);
    
    const supabase = getAdminClient();
    
    // Create a clean filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
        console.error('Upload error:', error);
        return c.json({ error: error.message }, 500);
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log(`File uploaded successfully: ${publicUrl}`);
    return c.json({ url: publicUrl });
  } catch (e: any) {
    console.error('Server upload error:', e);
    return c.json({ error: e.message || 'Server upload failed' }, 500);
  }
});

// Catch all for debugging
app.all('*', (c) => {
  console.log(`Unmatched route: ${c.req.method} ${c.req.url}`);
  return c.json({ 
    error: 'Not found',
    method: c.req.method,
    url: c.req.url,
    path: c.req.path
  }, 404);
});

console.log("FTO Community Platform API starting...");
Deno.serve(app.fetch);
