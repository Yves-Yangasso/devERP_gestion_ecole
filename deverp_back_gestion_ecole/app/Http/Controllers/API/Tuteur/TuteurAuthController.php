<?php

// namespace App\Http\Controllers\API\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\Tuteur;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Validator;

// class TuteurAuthController extends Controller
// {
//     public function inscription(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'name' => 'required|string|max:255',
//             'email' => 'required|email|unique:users,email',
//             'password' => 'required|min:8|confirmed',
//             'tuteur_id' => 'required|exists:tuteurs,id'
//         ]);

//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password)
//         ]);

//         $tuteur = Tuteur::findOrFail($request->tuteur_id);
//         $tuteur->user_id = $user->id;
//         $tuteur->save();

//         $user->assignRole('tuteur');

//         $token = $user->createToken('TuteurToken')->accessToken;

//         return response()->json([
//             'user' => $user,
//             'token' => $token
//         ], 201);
//     }

//     public function connexion(Request $request)
//     {
//         $credentials = $request->only('email', 'password');

//         if (!Auth::attempt($credentials)) {
//             return response()->json(['message' => 'Identifiants invalides'], 401);
//         }

//         $user = $request->user();
//         $token = $user->createToken('TuteurToken')->accessToken;

//         return response()->json([
//             'user' => $user,
//             'token' => $token
//         ]);
//     }
// }