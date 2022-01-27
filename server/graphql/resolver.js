const Issue = require('../models/issue.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const Vote = require('../models/vote.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var _ = require('lodash');

const resolvers = {
    // ------------------------------Query's --------------------------------------
    Query: {
      // GET all issues
      issues: async (parent, args, context, info) => {
        try {
          return await Issue.find().populate('author').populate('comments');
        } catch (error) {
          throw new Error(error)          
        }
      },

      // GET single issue with id
      issue_single: async (_, {id}) => {
        try {
          return await Issue.findById(id)
            .populate('author')
            .populate({
              path:     'comments',					
              populate: { path:  'author'}
            });
        } catch (error) {
          throw new Error(error)       ;   
        }
      },

      // GET issues for user logged in with email
      issues_user: async (_, {id}) => {
        try {
          return await Issue.find({author: id})
            .populate('author')
            .populate({	
              path:     'comments',			
              populate: { path:  'author'}
            });
        } catch (error) {
          throw new Error(error);
        }
      },

      //GET single user with jwt token
      get_user: async (root, args, context, info) => {

        try {
          if(context.token){
           const token = context.token.split(' ')[1];
      
           let decodedToken;
           try {
             decodedToken = await jwt.verify(token, 'somesupersecretkey');
           } catch (error) {console.log(error)};
   
           let authedUser; 
           try {
             authedUser = await User.findById(decodedToken.id);
            } catch (error) {console.log(error)};
            
           const {_id, email, name, issues, comments} = authedUser; 
           return {id: _id, email, name, issues, comments};
          }
          
        } catch (error){ 
          throw new Error(error)
        }
      },
    
      
      // POST login user with email and password
      login: async (root, {email, password}, context, info) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User does not exist!');
          }
          const isEqual = await bcrypt.compare(password, user.password);
          if (!isEqual) {
            throw new Error('Password is incorrect!');
          }
          if(!user) throw new Error('Error does not exist...')
  
          const token = jwt.sign(
            { id: user.id, email: user.email },
            'somesupersecretkey',
            {
              expiresIn: '1h'
            }
          );
          return { id: user.id, token: token, tokenExpiration: 1 };
          
        } catch (error) {
          throw new Error(error)
        }
      }
    },

    // ------------------------------Mutations's --------------------------------------
    Mutation: {
      createIssue: async (root, args, context, info) => {
        try {
          let issue = new Issue(args);
          const res = await issue.save()
          let user = await User.findByIdAndUpdate(args.author, {$addToSet: {issues: args.author}})
          return args.title;
        } catch (error) {
        throw new Error(error);        
        }
      },

        deleteIssue: async (root, args, context, info) => {
          try {
            let res = await Issue.findOneAndDelete({title : args.title});
            return res.title;
          } catch (error) {
            throw new Error(error);            
          }
        },
        createComment: async (root, args, context, info)=>{
          try {
            let comment = await new Comment({author: args.author, issue: args.issue, message: args.message});
            const res = await comment.save();
            const user = await User.findByIdAndUpdate(args.author, {$addToSet:{comments: comment}})
            const issue = await Issue.findByIdAndUpdate(args.issue, {$addToSet:{comments: comment}})
            return res.author;
          } catch (error) {
            throw new Error(error);            
          }
        },

        createUser: async (root, args, context, info) => {
          try {
            const existingUser = await User.findOne({email: args.email})
            if (existingUser) {
              throw new Error('User exists already.');
            }
            const hashedPW = await bcrypt.hash(args.password, 12);
  
            const user = new User({
              email: args.email,
              password: hashedPW,
              name: args.name
            });
  
            const result = await user.save();

            const token = await jwt.sign(
              { id: result.id, email: result.email },
              'somesupersecretkey',
              {
                expiresIn: '1h'
              }
            );

            return { id: result.id, token: token, tokenExpiration: 1 };
  
          } catch (error) {
            throw new Error(error);
          }
        },

        vote: async (root, args, context, info) => {
          try { 

            let exists = await User.aggregate([
              {
                '$match': {
                  'votes': {
                    '$elemMatch': {
                      '$exists': args.issue
                    }
                  }
                }
              }
            ]);

            console.log('exists: ', exists)
            if(exists) {
              let vote = new Vote({author: args.author, issue: args.issue, direction: args.direction});
              let result = await vote.save();
              let issue;
              if(vote.direction === true){
                issue = await Issue.findByIdAndUpdate(args.issue, {$addToSet:{upvotes: result.id} })
              }else{
                issue = await Issue.findByIdAndUpdate(args.issue, {$addToSet:{downvotes: result.id} })
              }
              await User.findByIdAndUpdate(args.author, {$addToSet: {votes: args.issue}})
              return issue.title;
            } else{
              return args.issue;
            }

          } catch (error) {
            throw new Error(error);
          }
        }
    }
}

module.exports = {
  resolvers
}