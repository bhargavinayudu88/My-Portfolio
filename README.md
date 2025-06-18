# Kartzy - Complete eCommerce Application

A modern, full-stack eCommerce application built with React.js frontend and AWS serverless backend, inspired by Amazon's design and functionality.

## 🚀 Features

### 🛍️ Product Categories
- **Groceries** - Fresh produce and daily essentials
- **Clothing** - Fashion for every occasion
- **Electronics** - Latest gadgets and tech
- **Furniture** - Stylish home furnishing
- **Cosmetics** - Beauty and personal care

### 🧩 Key Features
- ✅ User registration and login with AWS Cognito
- ✅ Product listing with categories and search functionality
- ✅ Product details page with image gallery
- ✅ Add to cart and remove from cart functionality
- ✅ Order placement and order history
- ✅ Responsive design for mobile and desktop
- ✅ Admin panel for managing products and categories
- ✅ Real-time inventory management
- ✅ Secure payment processing ready (Stripe integration)

## 🏗️ Architecture

### Frontend (React.js)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand + Context API
- **Routing**: React Router v6
- **Authentication**: AWS Amplify
- **UI Components**: Custom components with Lucide React icons

### Backend (AWS Serverless)
- **API**: AWS API Gateway + Lambda Functions
- **Database**: Amazon DynamoDB
- **Authentication**: AWS Cognito
- **File Storage**: Amazon S3
- **Infrastructure**: AWS SAM (Serverless Application Model)

## 📁 Project Structure

```
kartzy-ecommerce/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── auth/                # Authentication components
│   │   ├── common/              # Common components (ProductCard, etc.)
│   │   └── layout/              # Layout components (Navbar, Footer)
│   ├── context/                 # React Context providers
│   ├── data/                    # Mock data and constants
│   ├── pages/                   # Page components
│   └── utils/                   # Utility functions
├── backend/                     # AWS Lambda functions
│   └── functions/               # Individual Lambda functions
│       ├── products/            # Products CRUD operations
│       ├── orders/              # Orders management
│       └── users/               # User profile management
├── template.yaml                # AWS SAM template
└── README.md                    # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- AWS CLI configured with appropriate permissions
- AWS SAM CLI installed

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd kartzy-ecommerce
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your AWS configuration:

```env
VITE_AWS_REGION=us-east-1
VITE_USER_POOL_ID=your-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-client-id
VITE_API_ENDPOINT=your-api-gateway-url
VITE_S3_BUCKET=your-s3-bucket-name
```

### 3. Deploy AWS Infrastructure

```bash
# Build and deploy the serverless backend
sam build
sam deploy --guided

# Follow the prompts to configure your deployment
```

### 4. Update Environment Variables

After deployment, update your `.env` file with the outputs from the CloudFormation stack:

- User Pool ID
- User Pool Client ID
- API Gateway URL
- S3 Bucket name

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Local Development
```bash
# Start the frontend development server
npm run dev

# Test Lambda functions locally (requires SAM CLI)
sam local start-api
```

### Production Testing
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to various platforms:

- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **AWS S3 + CloudFront**: Host as a static website

### Backend Deployment
```bash
# Deploy to AWS
sam build && sam deploy
```

## 🔐 Security Features

- **Authentication**: AWS Cognito with email verification
- **Authorization**: JWT tokens for API access
- **Data Protection**: All API endpoints secured
- **Input Validation**: Client and server-side validation
- **CORS**: Properly configured for security

## 📊 Database Schema

### Products Table
```
{
  id: String (Primary Key),
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  reviews: Number,
  createdAt: String,
  updatedAt: String
}
```

### Orders Table
```
{
  id: String (Primary Key),
  userId: String (GSI),
  items: Array,
  total: Number,
  status: String,
  shippingAddress: Object,
  paymentMethod: Object,
  createdAt: String,
  updatedAt: String
}
```

### Users Table
```
{
  id: String (Primary Key),
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: Object,
  preferences: Object,
  createdAt: String,
  updatedAt: String
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🔧 Configuration

### AWS Services Configuration

1. **Cognito User Pool**: Configure password policies and user attributes
2. **DynamoDB**: Set up tables with appropriate indexes
3. **S3 Bucket**: Configure CORS for image uploads
4. **API Gateway**: Set up CORS and authorization
5. **Lambda Functions**: Configure environment variables and permissions

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_AWS_REGION` | AWS region | Yes |
| `VITE_USER_POOL_ID` | Cognito User Pool ID | Yes |
| `VITE_USER_POOL_CLIENT_ID` | Cognito Client ID | Yes |
| `VITE_API_ENDPOINT` | API Gateway URL | Yes |
| `VITE_S3_BUCKET` | S3 bucket name | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Optional |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the AWS CloudFormation logs for backend issues

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications (AWS SES)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Mobile app (React Native)

---

Built with ❤️ using React.js and AWS Serverless Architecture