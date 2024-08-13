<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Product;

class EtiquettesController extends Controller
{
    public function generatePDF()
    {
        // Nombre de produits par lot
        $perPage = 120;
        // Obtenez le nombre total de pages
        $totalPages = ceil(Product::count() / $perPage);

        // Créez une collection de PDFs
        $pdfs = collect();

        // Parcourez chaque page de produits
        for ($page = 1; $page <= $totalPages; $page++) {
            $products = Product::skip(($page - 1) * $perPage)->take($perPage)->get();
            $pdf = PDF::loadView('etiquettes', compact('products'))->output();
            $pdfs->push($pdf);
        }

        // Combine PDFs into one file (optional)
        $mergedPdf = $this->combinePdfs($pdfs);

        // Return the combined PDF as a download
        return response()->streamDownload(function() use ($mergedPdf) {
            echo $mergedPdf;
        }, 'etiquettes.pdf');
    }
    public function copyAllCodes()
    {
        // Récupérez tous les codes de produits
        $products = Product::all('code');
        $codes = $products->pluck('code')->toArray();

        // Créez une chaîne de caractères avec tous les codes, chaque code sur une nouvelle ligne
        $codesString = implode("\n", $codes);

        // Retournez le fichier texte en réponse
        return response($codesString)
            ->header('Content-Type', 'text/plain')
            ->header('Content-Disposition', 'attachment; filename="product_codes.txt"');
    }
    private function combinePdfs($pdfs)
    {
        // Temporary directory to save individual PDFs
        $tempDir = storage_path('app/public/temp_pdfs');
        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $mergedPdf = new \Clegginabox\PDFMerger\PDFMerger;

        // Save each PDF to a temporary file and add to the merger
        foreach ($pdfs as $index => $pdfContent) {
            $tempFilePath = $tempDir . "/temp_pdf_{$index}.pdf";
            file_put_contents($tempFilePath, $pdfContent);
            $mergedPdf->addPDF($tempFilePath);
        }

        // Merge PDFs and get the content
        $mergedPdfContent = $mergedPdf->merge('string');

        // Clean up temporary files
        foreach (glob($tempDir . "/*.pdf") as $tempFile) {
            unlink($tempFile);
        }

        return $mergedPdfContent;
    }
    public function printSelected($ids)
    {
        $idsArray = explode(',', $ids);
        $products = Product::whereIn('id', $idsArray)->get();

        $pdf = PDF::loadView('etiquettes', compact('products'));
        return $pdf->stream('etiquettes.pdf');
    }
}
