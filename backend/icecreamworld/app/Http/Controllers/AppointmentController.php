<?php

namespace App\Http\Controllers;

use App\Models\Appoitment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AppointmentController extends Controller
{
    //

    public function getAll(Request $request)
    {
        $all = Appoitment::get()->toJson();
        $queryParam = $request->query('date');

        return response()->json(['message' => 'Record created successfully', 'data' => $all]);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'guest_count' => 'required|integer',
            'date_time' => 'required|string',
        ]);

        $date = \Carbon\Carbon::parse($request->date_time);

        
        $date->format('Y-m-d');
        $date->format('H:i:s');

        //$date = Carbon::createFromFormat('m/d/Y', $request->date_time);

        $record = new Appoitment;
        $record->name = $request->name ?? '';
        $record->email = $request->email ?? '';
        $record->guest_count = $request->guest_count ?? 0;
        $record->date_time = $date ?? '';

        $record->save();

        if ($record) {
            return response()->json(['message' => 'Record created successfully', 'data' => $record]);
        }

    }
}